import { NextRequest, NextResponse } from 'next/server';
import { sql, type Sector } from '@/lib/db';

const TABLES: Record<Sector, string> = {
  hospice: 'hospice_providers',
  home_health: 'home_health_providers',
};

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sector = (request.nextUrl.searchParams.get('sector') || 'hospice') as Sector;
    const table = TABLES[sector] || 'hospice_providers';

    const topOpportunities = await sql.query(`
      SELECT
        ccn, provider_name, city, state, county,
        overall_score, quality_score, compliance_score, operational_score, market_score,
        estimated_adc, classification,
        total_revenue, total_expenses, net_income, cost_per_day,
        county_pop_65_plus, county_pct_65_plus, county_median_income,
        con_state, ownership_type_cms, pe_backed, chain_affiliated,
        cms_quality_star,
        npi, ein, authorized_official,
        phone_number, website, address_line_1,
        latitude, longitude,
        outreach_readiness, platform_vs_tuckin, confidence_level,
        sell_side_hypothesis, classification_reasons
      FROM ${table}
      WHERE classification = 'GREEN'
        AND overall_score IS NOT NULL
      ORDER BY overall_score DESC, estimated_adc DESC NULLS LAST
      LIMIT 10
    `);

    const marketStats = await sql.query(`
      SELECT
        COUNT(*) FILTER (WHERE classification = 'GREEN') as total_green,
        COUNT(*) FILTER (WHERE classification = 'GREEN' AND con_state = true) as green_in_con,
        ROUND(AVG(overall_score) FILTER (WHERE classification = 'GREEN'), 1) as avg_green_score,
        ROUND(AVG(estimated_adc) FILTER (WHERE classification = 'GREEN'), 1) as avg_green_adc,
        ROUND(SUM(total_revenue) FILTER (WHERE classification = 'GREEN'), 0) as total_green_revenue,
        ROUND(AVG(total_revenue) FILTER (WHERE classification = 'GREEN' AND total_revenue IS NOT NULL), 0) as avg_green_revenue,
        COUNT(*) FILTER (WHERE classification = 'GREEN' AND total_revenue IS NOT NULL) as green_with_financials
      FROM ${table}
    `);

    const stateDistribution = await sql.query(`
      SELECT
        state,
        COUNT(*) as count,
        ROUND(AVG(overall_score), 1) as avg_score,
        BOOL_OR(con_state) as is_con_state
      FROM ${table}
      WHERE classification = 'GREEN'
      GROUP BY state
      ORDER BY count DESC
      LIMIT 10
    `);

    return NextResponse.json({
      opportunities: topOpportunities,
      marketStats: marketStats[0],
      stateDistribution,
    });
  } catch (error) {
    console.error('Top opportunities API error:', error);
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}
