import { NextRequest, NextResponse } from 'next/server';
import { getStates, type Sector } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sector = (request.nextUrl.searchParams.get('sector') || 'hospice') as Sector;
    const result = await getStates(sector);
    const states = result.map((r: any) => r.state);
    return NextResponse.json({ states });
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}
