import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { type Sector } from '@/lib/db';

const TABLES: Record<Sector, string> = {
  hospice: 'hospice_providers',
  home_health: 'home_health_providers',
};

export async function GET(request: NextRequest) {
  const sql = neon(process.env.DATABASE_URL!);
  const searchParams = request.nextUrl.searchParams;

  const sector = (searchParams.get('sector') || 'hospice') as Sector;
  const table = TABLES[sector] || 'hospice_providers';

  const classification = searchParams.get('classification');
  const state = searchParams.get('state');
  const conStateOnly = searchParams.get('conStateOnly') === 'true';
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const conditions: string[] = ['1=1'];
    const params: any[] = [];
    let idx = 1;

    if (classification) {
      conditions.push(`classification = $${idx++}`);
      params.push(classification);
    }
    if (state) {
      conditions.push(`state = $${idx++}`);
      params.push(state);
    }
    if (conStateOnly) {
      conditions.push(`con_state = true`);
    }
    if (search) {
      conditions.push(`(provider_name ILIKE $${idx} OR city ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx++;
    }

    const where = conditions.join(' AND ');

    const totalResult = await sql.query(
      `SELECT COUNT(*) as total FROM ${table} WHERE ${where}`,
      params
    );

    const providersResult = await sql.query(
      `SELECT * FROM ${table}
       WHERE ${where}
       ORDER BY
         CASE classification WHEN 'GREEN' THEN 1 WHEN 'YELLOW' THEN 2 ELSE 3 END,
         overall_score DESC NULLS LAST
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    const total = parseInt(totalResult[0]?.total || '0');

    return NextResponse.json({ providers: providersResult, total });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 });
  }
}
