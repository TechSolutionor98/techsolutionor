import { syncIncomingEmails } from './email-imap-service.js';
import { getDb } from './mongodb.js';

let isSyncing = false;
let lastSyncTime = 0;
const MIN_INTERVAL_MS = 20000; // 20 seconds minimum interval between successive syncs
const LOCK_STALE_MS = 45000;   // 45 seconds lock expiry for serverless timeouts

/**
 * Acquire distributed lock in MongoDB to prevent concurrent syncs across serverless lambdas
 */
async function acquireDistributedLock() {
  try {
    const db = await getDb();
    const col = db.collection('email_sync_state');
    const now = new Date();
    const staleThreshold = new Date(Date.now() - LOCK_STALE_MS);

    const res = await col.findOneAndUpdate(
      {
        _id: 'hostinger_imap_sync',
        $or: [
          { isLocked: { $ne: true } },
          { lockedAt: { $lt: staleThreshold } },
        ],
      },
      {
        $set: {
          isLocked: true,
          lockedAt: now,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    return !!res;
  } catch (err) {
    // If DB check fails, fallback to local in-memory lock
    return !isSyncing;
  }
}

/**
 * Release distributed lock in MongoDB and record sync statistics
 */
async function releaseDistributedLock(syncStats = null) {
  try {
    const db = await getDb();
    const col = db.collection('email_sync_state');
    const now = new Date();
    await col.updateOne(
      { _id: 'hostinger_imap_sync' },
      {
        $set: {
          isLocked: false,
          lastSyncAt: now.toISOString(),
          ...(syncStats ? { lastSyncStats: syncStats } : {}),
        },
      },
      { upsert: true }
    );
  } catch (_) {}
}

/**
 * Read current sync state from MongoDB
 */
async function getRecentSyncState() {
  try {
    const db = await getDb();
    const col = db.collection('email_sync_state');
    return await col.findOne({ _id: 'hostinger_imap_sync' });
  } catch (_) {
    return null;
  }
}

/**
 * Triggers an automated, thread-safe background synchronization with Hostinger IMAP.
 * Concurrency guard: skips if already syncing or if sync ran within MIN_INTERVAL_MS.
 */
export async function triggerAutoSync({
  waitForCompletion = false,
  limit = 25,
  markSeen = true,
  onlyUnseen = true,
  force = false,
} = {}) {
  const now = Date.now();

  // 1. In-memory concurrency guard
  if (isSyncing) {
    return { success: true, skipped: true, reason: 'Sync already in progress' };
  }

  // 2. In-memory rate-limiting guard (unless force=true)
  if (!force && (now - lastSyncTime < MIN_INTERVAL_MS)) {
    return {
      success: true,
      skipped: true,
      reason: 'Sync run recently',
      nextAllowedInMs: MIN_INTERVAL_MS - (now - lastSyncTime),
    };
  }

  // 3. Distributed cross-instance check in MongoDB
  if (!force) {
    const state = await getRecentSyncState();
    if (state?.isLocked && state?.lockedAt) {
      const lockAge = now - new Date(state.lockedAt).getTime();
      if (lockAge < LOCK_STALE_MS) {
        return { success: true, skipped: true, reason: 'Sync already in progress (distributed lock)' };
      }
    }
    if (state?.lastSyncAt) {
      const timeSinceLastSync = now - new Date(state.lastSyncAt).getTime();
      if (timeSinceLastSync < MIN_INTERVAL_MS) {
        return {
          success: true,
          skipped: true,
          reason: 'Sync run recently (distributed)',
          nextAllowedInMs: MIN_INTERVAL_MS - timeSinceLastSync,
        };
      }
    }
  }

  // 4. Acquire distributed lock
  const lockAcquired = await acquireDistributedLock();
  if (!lockAcquired) {
    return { success: true, skipped: true, reason: 'Could not acquire distributed sync lock' };
  }

  isSyncing = true;

  const syncPromise = (async () => {
    let result = null;
    try {
      result = await syncIncomingEmails({ limit, markSeen, onlyUnseen });
      lastSyncTime = Date.now();
      if (result && result.syncedCount > 0) {
        console.log(`[Auto-Sync] Ingested ${result.syncedCount} new incoming email(s) from Hostinger into MongoDB.`);
      }
      return result;
    } catch (err) {
      console.error('[Auto-Sync] Background IMAP sync error:', err?.message || err);
      return { success: false, error: err?.message || 'Sync error' };
    } finally {
      isSyncing = false;
      await releaseDistributedLock(
        result ? { syncedCount: result.syncedCount, newThreadsCount: result.newThreadsCount } : null
      );
    }
  })();

  if (waitForCompletion) {
    return await syncPromise;
  }

  // Non-blocking fire-and-forget for instant API response
  syncPromise.catch(() => {});
  return { triggered: true };
}

// Background poller interval in long-running Node runtime (e.g. VPS or local dev)
if (typeof globalThis !== 'undefined' && !globalThis.__emailAutoSyncInterval) {
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.npm_lifecycle_event === 'build';
  if (!isBuild && process.env.NODE_ENV !== 'test') {
    globalThis.__emailAutoSyncInterval = setInterval(() => {
      triggerAutoSync({ waitForCompletion: false }).catch(() => {});
    }, 120000);
    // Unref timer so it does not block the Node.js event loop or process shutdown
    if (typeof globalThis.__emailAutoSyncInterval?.unref === 'function') {
      globalThis.__emailAutoSyncInterval.unref();
    }
  }
}
