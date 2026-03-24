import { NextRequest, NextResponse } from 'next/server';
import { getSimilarProviders, getDataQualityScore, type Sector } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ccn = searchParams.get('ccn');
    const type = searchParams.get('type') || 'similar';
    const limit = parseInt(searchParams.get('limit') || '5');
    const sector = (searchParams.get('sector') || 'hospice') as Sector;

    if (!ccn) {
      return NextResponse.json({ success: false, error: 'CCN is required' }, { status: 400 });
    }

    if (type === 'quality') {
      const quality = await getDataQualityScore(ccn, sector);
      return NextResponse.json({ success: true, data: quality });
    }

    const similar = await getSimilarProviders(ccn, limit, sector);
    return NextResponse.json({ success: true, data: similar });
  } catch (error) {
    console.error('Error fetching similar providers:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch similar providers' }, { status: 500 });
  }
}
