import { syncIncomingEmails } from './email-imap-service.js';

let isSyncing = false;
let lastSyncTime = 0;
const MIN_INTERVAL_MS = 15000; // at least 15 seconds between sync checks

/**
 * Triggers an automated, thread-safe background synchronization with Hostinger IMAP.
 * Concurrency guard: skips if already syncing or if sync ran within MIN_INTERVAL_MS.
 */
export async function triggerAutoSync({ waitForCompletion = false, limit = 25, markSeen = true } = {}) {
  const now = Date.now();

  // Concurrency & rate-limiting guard
  if (isSyncing) {
    return { skipped: true, reason: 'Sync already in progress' };
  }
  if (now - lastSyncTime < MIN_INTERVAL_MS) {
    return { skipped: true, reason: 'Sync run recently', nextAllowedInMs: MIN_INTERVAL_MS - (now - lastSyncTime) };
  }

  isSyncing = true;

  const syncPromise = (async () => {
    try {
      const result = await syncIncomingEmails({ limit, markSeen });
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
    }
  })();

  if (waitForCompletion) {
    return await syncPromise;
  }

  // Non-blocking fire-and-forget for instant API response
  syncPromise.catch(() => {});
  return { triggered: true };
}

// Background poller interval in Node runtime (runs every 25 seconds)
if (typeof globalThis !== 'undefined' && !globalThis.__emailAutoSyncInterval) {
  globalThis.__emailAutoSyncInterval = setInterval(() => {
    triggerAutoSync({ waitForCompletion: false }).catch(() => {});
  }, 25000);
}
