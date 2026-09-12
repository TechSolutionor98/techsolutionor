import { NextResponse } from 'next/server';
import { getDashboardCounts } from '@/lib/cms-service';

export async function GET(request) {
  try {
    const counts = await getDashboardCounts();
    return NextResponse.json(counts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
