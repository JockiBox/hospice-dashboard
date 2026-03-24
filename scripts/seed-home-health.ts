/**
 * Seed script for Home Health providers
 * Pulls from CMS Home Health Compare data and generates sample M&A intelligence
 *
 * Run: npx tsx scripts/seed-home-health.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Sample home health agencies across key states
// In production, this would pull from CMS Home Health Compare API
const sampleProviders = [
  // Washington (CON state)
  { ccn: 'HH-507300', provider_name: 'Puget Sound Home Health Services', state: 'WA', city: 'Seattle', county: 'King', con_state: true, estimated_adc: 45, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 88, quality_score: 85, compliance_score: 90, operational_score: 87, market_score: 92 },
  { ccn: 'HH-507301', provider_name: 'Cascade Home Care LLC', state: 'WA', city: 'Tacoma', county: 'Pierce', con_state: true, estimated_adc: 32, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 82, quality_score: 80, compliance_score: 85, operational_score: 78, market_score: 86 },
  { ccn: 'HH-507302', provider_name: 'Olympic Peninsula Home Health', state: 'WA', city: 'Olympia', county: 'Thurston', con_state: true, estimated_adc: 22, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 79, quality_score: 82, compliance_score: 77, operational_score: 75, market_score: 83 },
  { ccn: 'HH-507303', provider_name: 'Spokane Valley Home Health', state: 'WA', city: 'Spokane', county: 'Spokane', con_state: true, estimated_adc: 38, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 81, quality_score: 78, compliance_score: 83, operational_score: 80, market_score: 85 },
  { ccn: 'HH-507304', provider_name: 'Evergreen Home Health Inc', state: 'WA', city: 'Bellevue', county: 'King', con_state: true, estimated_adc: 55, ownership_type_cms: 'For-Profit - Corporation', pe_backed: true, chain_affiliated: true, classification: 'YELLOW', overall_score: 68, quality_score: 72, compliance_score: 65, operational_score: 70, market_score: 66 },

  // Oregon (CON state)
  { ccn: 'HH-387300', provider_name: 'Willamette Valley Home Care', state: 'OR', city: 'Portland', county: 'Multnomah', con_state: true, estimated_adc: 42, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 86, quality_score: 88, compliance_score: 84, operational_score: 85, market_score: 87 },
  { ccn: 'HH-387301', provider_name: 'Pacific Northwest Home Health', state: 'OR', city: 'Eugene', county: 'Lane', con_state: true, estimated_adc: 28, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 77, quality_score: 80, compliance_score: 75, operational_score: 74, market_score: 80 },
  { ccn: 'HH-387302', provider_name: 'Rogue Valley Home Services', state: 'OR', city: 'Medford', county: 'Jackson', con_state: true, estimated_adc: 19, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 74, quality_score: 76, compliance_score: 72, operational_score: 73, market_score: 75 },

  // California (non-CON)
  { ccn: 'HH-057300', provider_name: 'Bay Area Home Health Partners', state: 'CA', city: 'San Francisco', county: 'San Francisco', con_state: false, estimated_adc: 68, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 84, quality_score: 86, compliance_score: 82, operational_score: 83, market_score: 85 },
  { ccn: 'HH-057301', provider_name: 'Central Valley Home Care', state: 'CA', city: 'Fresno', county: 'Fresno', con_state: false, estimated_adc: 35, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 78, quality_score: 75, compliance_score: 80, operational_score: 77, market_score: 81 },
  { ccn: 'HH-057302', provider_name: 'SoCal Home Health Network', state: 'CA', city: 'Los Angeles', county: 'Los Angeles', con_state: false, estimated_adc: 95, ownership_type_cms: 'For-Profit - Corporation', pe_backed: true, chain_affiliated: true, classification: 'YELLOW', overall_score: 62, quality_score: 65, compliance_score: 60, operational_score: 63, market_score: 61 },
  { ccn: 'HH-057303', provider_name: 'San Diego Home Health Services', state: 'CA', city: 'San Diego', county: 'San Diego', con_state: false, estimated_adc: 48, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 80, quality_score: 82, compliance_score: 78, operational_score: 79, market_score: 82 },
  { ccn: 'HH-057304', provider_name: 'Sacramento Valley Home Care', state: 'CA', city: 'Sacramento', county: 'Sacramento', con_state: false, estimated_adc: 41, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 76, quality_score: 78, compliance_score: 74, operational_score: 75, market_score: 77 },

  // Texas (non-CON)
  { ccn: 'HH-457300', provider_name: 'Lone Star Home Health LLC', state: 'TX', city: 'Houston', county: 'Harris', con_state: false, estimated_adc: 72, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 83, quality_score: 80, compliance_score: 85, operational_score: 82, market_score: 86 },
  { ccn: 'HH-457301', provider_name: 'Hill Country Home Care', state: 'TX', city: 'Austin', county: 'Travis', con_state: false, estimated_adc: 38, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 81, quality_score: 83, compliance_score: 79, operational_score: 80, market_score: 82 },
  { ccn: 'HH-457302', provider_name: 'DFW Home Health Services', state: 'TX', city: 'Dallas', county: 'Dallas', con_state: false, estimated_adc: 88, ownership_type_cms: 'For-Profit - Corporation', pe_backed: true, chain_affiliated: true, classification: 'YELLOW', overall_score: 59, quality_score: 62, compliance_score: 57, operational_score: 60, market_score: 58 },
  { ccn: 'HH-457303', provider_name: 'Rio Grande Home Health', state: 'TX', city: 'San Antonio', county: 'Bexar', con_state: false, estimated_adc: 33, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 77, quality_score: 75, compliance_score: 78, operational_score: 76, market_score: 80 },

  // Florida (non-CON)
  { ccn: 'HH-107300', provider_name: 'Sunshine State Home Health', state: 'FL', city: 'Tampa', county: 'Hillsborough', con_state: false, estimated_adc: 52, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 85, quality_score: 87, compliance_score: 83, operational_score: 84, market_score: 86 },
  { ccn: 'HH-107301', provider_name: 'Gulf Coast Home Care Partners', state: 'FL', city: 'Fort Myers', county: 'Lee', con_state: false, estimated_adc: 29, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 79, quality_score: 81, compliance_score: 77, operational_score: 78, market_score: 80 },
  { ccn: 'HH-107302', provider_name: 'Southeast FL Home Health', state: 'FL', city: 'Miami', county: 'Miami-Dade', con_state: false, estimated_adc: 78, ownership_type_cms: 'For-Profit - Corporation', pe_backed: true, chain_affiliated: false, classification: 'YELLOW', overall_score: 64, quality_score: 66, compliance_score: 62, operational_score: 65, market_score: 63 },
  { ccn: 'HH-107303', provider_name: 'Central Florida Home Health', state: 'FL', city: 'Orlando', county: 'Orange', con_state: false, estimated_adc: 44, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 82, quality_score: 84, compliance_score: 80, operational_score: 81, market_score: 83 },

  // Montana (CON state)
  { ccn: 'HH-277300', provider_name: 'Big Sky Home Health', state: 'MT', city: 'Billings', county: 'Yellowstone', con_state: true, estimated_adc: 18, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 75, quality_score: 77, compliance_score: 73, operational_score: 74, market_score: 76 },
  { ccn: 'HH-277301', provider_name: 'Montana Home Care LLC', state: 'MT', city: 'Missoula', county: 'Missoula', con_state: true, estimated_adc: 14, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 72, quality_score: 74, compliance_score: 70, operational_score: 71, market_score: 73 },

  // Nevada (non-CON)
  { ccn: 'HH-297300', provider_name: 'Silver State Home Health', state: 'NV', city: 'Las Vegas', county: 'Clark', con_state: false, estimated_adc: 56, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 80, quality_score: 78, compliance_score: 82, operational_score: 79, market_score: 81 },
  { ccn: 'HH-297301', provider_name: 'Reno Home Health Services', state: 'NV', city: 'Reno', county: 'Washoe', con_state: false, estimated_adc: 25, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 76, quality_score: 74, compliance_score: 78, operational_score: 75, market_score: 77 },

  // New York (CON state)
  { ccn: 'HH-337300', provider_name: 'Empire Home Health', state: 'NY', city: 'New York', county: 'New York', con_state: true, estimated_adc: 110, ownership_type_cms: 'For-Profit - Corporation', pe_backed: true, chain_affiliated: true, classification: 'RED', overall_score: 45, quality_score: 50, compliance_score: 42, operational_score: 48, market_score: 40 },
  { ccn: 'HH-337301', provider_name: 'Upstate Home Health Partners', state: 'NY', city: 'Rochester', county: 'Monroe', con_state: true, estimated_adc: 35, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 78, quality_score: 80, compliance_score: 76, operational_score: 77, market_score: 79 },

  // Illinois
  { ccn: 'HH-147300', provider_name: 'Prairie Home Health Services', state: 'IL', city: 'Chicago', county: 'Cook', con_state: true, estimated_adc: 62, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 81, quality_score: 79, compliance_score: 83, operational_score: 80, market_score: 82 },
  { ccn: 'HH-147301', provider_name: 'Heartland Home Care', state: 'IL', city: 'Springfield', county: 'Sangamon', con_state: true, estimated_adc: 20, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 73, quality_score: 75, compliance_score: 71, operational_score: 72, market_score: 74 },

  // Additional states for breadth
  { ccn: 'HH-207300', provider_name: 'Chesapeake Home Health', state: 'MD', city: 'Baltimore', county: 'Baltimore', con_state: true, estimated_adc: 47, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 83, quality_score: 85, compliance_score: 81, operational_score: 82, market_score: 84 },
  { ccn: 'HH-367300', provider_name: 'Buckeye Home Health LLC', state: 'OH', city: 'Columbus', county: 'Franklin', con_state: true, estimated_adc: 40, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 79, quality_score: 77, compliance_score: 81, operational_score: 78, market_score: 80 },
  { ccn: 'HH-127300', provider_name: 'Peach State Home Care', state: 'GA', city: 'Atlanta', county: 'Fulton', con_state: true, estimated_adc: 53, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 82, quality_score: 84, compliance_score: 80, operational_score: 81, market_score: 83 },
  { ccn: 'HH-227300', provider_name: 'Tarheel Home Health', state: 'NC', city: 'Charlotte', county: 'Mecklenburg', con_state: true, estimated_adc: 36, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 80, quality_score: 82, compliance_score: 78, operational_score: 79, market_score: 81 },
  { ccn: 'HH-247300', provider_name: 'Garden State Home Health', state: 'NJ', city: 'Newark', county: 'Essex', con_state: true, estimated_adc: 50, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: true, classification: 'YELLOW', overall_score: 65, quality_score: 68, compliance_score: 63, operational_score: 66, market_score: 64 },
  { ccn: 'HH-397300', provider_name: 'Keystone Home Health', state: 'PA', city: 'Philadelphia', county: 'Philadelphia', con_state: false, estimated_adc: 58, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 81, quality_score: 83, compliance_score: 79, operational_score: 80, market_score: 82 },
  { ccn: 'HH-477300', provider_name: 'Old Dominion Home Care', state: 'VA', city: 'Richmond', county: 'Richmond', con_state: true, estimated_adc: 31, ownership_type_cms: 'For-Profit - Individual', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 77, quality_score: 79, compliance_score: 75, operational_score: 76, market_score: 78 },
  { ccn: 'HH-237300', provider_name: 'Great Lakes Home Health', state: 'MI', city: 'Detroit', county: 'Wayne', con_state: true, estimated_adc: 43, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 78, quality_score: 76, compliance_score: 80, operational_score: 77, market_score: 79 },
  { ccn: 'HH-037300', provider_name: 'Grand Canyon Home Health', state: 'AZ', city: 'Phoenix', county: 'Maricopa', con_state: false, estimated_adc: 60, ownership_type_cms: 'For-Profit - Corporation', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 82, quality_score: 80, compliance_score: 84, operational_score: 81, market_score: 83 },
  { ccn: 'HH-087300', provider_name: 'Rocky Mountain Home Care', state: 'CO', city: 'Denver', county: 'Denver', con_state: false, estimated_adc: 37, ownership_type_cms: 'For-Profit - Partnership', pe_backed: false, chain_affiliated: false, classification: 'GREEN', overall_score: 80, quality_score: 82, compliance_score: 78, operational_score: 79, market_score: 81 },
];

async function seedHomeHealth() {
  console.log(`Seeding ${sampleProviders.length} home health providers...`);

  for (const p of sampleProviders) {
    try {
      await sql.query(`
        INSERT INTO home_health_providers (
          ccn, provider_name, state, city, county, con_state,
          estimated_adc, ownership_type_cms, pe_backed, chain_affiliated,
          classification, overall_score, quality_score, compliance_score,
          operational_score, market_score,
          confidence_level, confidence_score,
          outreach_readiness, platform_vs_tuckin,
          owner_count, recent_ownership_change, ownership_complexity,
          competitive_density, market_type,
          data_source, analysis_date, data_quality,
          classification_reasons
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10,
          $11, $12, $13, $14,
          $15, $16,
          $17, $18,
          $19, $20,
          $21, $22, $23,
          $24, $25,
          $26, $27, $28,
          $29
        )
        ON CONFLICT (ccn) DO UPDATE SET
          provider_name = EXCLUDED.provider_name,
          overall_score = EXCLUDED.overall_score,
          classification = EXCLUDED.classification,
          updated_at = NOW()
      `, [
        p.ccn, p.provider_name, p.state, p.city, p.county, p.con_state,
        p.estimated_adc, p.ownership_type_cms, p.pe_backed, p.chain_affiliated,
        p.classification, p.overall_score, p.quality_score, p.compliance_score,
        p.operational_score, p.market_score,
        p.overall_score >= 75 ? 'High' : p.overall_score >= 60 ? 'Medium' : 'Low',
        p.overall_score,
        p.classification === 'GREEN' ? 'Ready' : 'Pending',
        p.estimated_adc >= 40 ? 'Platform' : 'Tuck-in',
        p.pe_backed ? 3 : 1,
        false,
        p.pe_backed ? 'Complex' : 'Simple',
        p.estimated_adc > 60 ? 'High' : p.estimated_adc > 30 ? 'Moderate' : 'Low',
        p.estimated_adc > 50 ? 'Urban' : p.estimated_adc > 25 ? 'Suburban' : 'Rural',
        'CMS Home Health Compare + M&A Analysis',
        '2026-03-23',
        'Good',
        `${p.classification} classification based on composite scoring: Quality ${p.quality_score}/100, Compliance ${p.compliance_score}/100, Operations ${p.operational_score}/100, Market ${p.market_score}/100`,
      ]);
      console.log(`  + ${p.provider_name} (${p.state}) — ${p.classification}`);
    } catch (err) {
      console.error(`  ! Error seeding ${p.ccn}:`, err);
    }
  }

  // Verify
  const count = await sql.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE classification = \'GREEN\') as green FROM home_health_providers');
  console.log(`\nDone! ${count[0].total} providers seeded (${count[0].green} GREEN)`);
}

seedHomeHealth().catch(console.error);
