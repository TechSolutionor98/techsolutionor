import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Shopify reviews API endpoint' });
}
