import { NextResponse } from 'next/server';
import { syncIncomingEmails, getImapConfig } from '../email-imap-service.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const markSeen = searchParams.get('markSeen') !== 'false';

    console.log(`[API /api/emails/sync] Starting sync (limit=${limit})...`);
    const result = await syncIncomingEmails({ limit, markSeen });
    console.log(`[API /api/emails/sync] Sync finished:`, result);

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
      headers: CORS_HEADERS,
    });
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
