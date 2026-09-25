import { NextResponse } from 'next/server';
import { getImapConfig } from '../email-imap-service.js';
import { triggerAutoSync } from '../email-auto-sync.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Cron-Secret',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
  return handleSync(request);
}

export async function POST(request) {
  return handleSync(request);
}

async function handleSync(request) {
  try {
    const config = getImapConfig();
    if (!config.user || !config.pass) {
      return NextResponse.json(
        {
          success: false,
          error: 'IMAP credentials not configured in environment variables (IMAP_USER / IMAP_PASS or SMTP_USER / SMTP_PASS).',
          mailboxHost: config.host,
          mailboxUser: config.user || 'None',
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { searchParams } = new URL(request.url);

    // Optional secret check if CRON_SECRET is configured in environment
    const configuredSecret = process.env.CRON_SECRET?.trim();
    if (configuredSecret) {
      const authHeader = request.headers.get('authorization') || '';
      const headerSecret = request.headers.get('x-cron-secret') || '';
      const bearerToken = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : '';
      const querySecret = searchParams.get('secret') || searchParams.get('key') || '';
      const providedSecret = bearerToken || headerSecret || querySecret;

      if (providedSecret !== configuredSecret) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Invalid cron secret' },
          { status: 401, headers: CORS_HEADERS }
        );
      }
    }

    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const markSeen = searchParams.get('markSeen') !== 'false';
    const force = searchParams.get('force') === 'true';

    console.log(`[API /api/emails/sync] Starting sync via triggerAutoSync (limit=${limit}, force=${force})...`);
    const result = await triggerAutoSync({
      waitForCompletion: true,
      limit,
      markSeen,
      onlyUnseen: true,
      force,
    });
    console.log(`[API /api/emails/sync] Sync completed:`, result);

    return NextResponse.json(
      {
        success: result.success !== false,
        syncedCount: result.syncedCount || 0,
        newThreadsCount: result.newThreadsCount || 0,
        skipped: result.skipped || false,
        reason: result.reason || undefined,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: CORS_HEADERS,
      }
    );
  } catch (err) {
    console.error('API /api/emails/sync error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error during email synchronization',
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
