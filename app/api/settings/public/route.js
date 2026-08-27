import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const db = await getDb();
    const settings = await db.collection('settings').findOne({ _id: 'website_settings' });
    
    const defaultSettings = {
      phone: '+971 4-354 0566',
      email: 'contact@osumfix.ae',
      address: 'Al Jahra Building, 2nd floor, 18th St – Al Raffa – Dubai',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      googleAnalyticsId: '',
      googleTagManagerId: '',
      facebookPixelId: '',
      customHeadScript: '',
      customBodyScript: ''
    };
    
    const result = settings ? { ...defaultSettings, ...settings } : defaultSettings;
    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Error fetching public settings:', err);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500, headers: CORS_HEADERS });
  }
}
