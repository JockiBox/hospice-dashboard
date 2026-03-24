import { getStats, getStateStats, getTopTargets, getOwnershipStats, getAdcDistribution, getScoreDistribution, getMapData, getConStateComparison, getEndemicStats, getDealPipelineStats, type Sector } from '@/lib/db';
import { DashboardWrapper } from '@/components/DashboardWrapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchDashboardData(sector: Sector) {
  const [stats, stateStats, topTargets, ownershipStats, adcDistribution, scoreDistribution, mapData, conComparison, endemicStats, pipelineStats] = await Promise.all([
    getStats(sector),
    getStateStats(sector),
    getTopTargets(5, sector),
    getOwnershipStats(sector),
    getAdcDistribution(sector),
    getScoreDistribution(sector),
    getMapData(sector),
    getConStateComparison(sector),
    getEndemicStats(sector),
    getDealPipelineStats(sector),
  ]);

  return { stats, stateStats, topTargets, ownershipStats, adcDistribution, scoreDistribution, mapData, conComparison, endemicStats, pipelineStats };
}

export default async function Dashboard() {
  try {
    // Fetch both sectors in parallel on the server
    const [hospiceData, homeHealthData] = await Promise.all([
      fetchDashboardData('hospice'),
      fetchDashboardData('home_health'),
    ]);

    return (
      <DashboardWrapper
        hospiceData={hospiceData}
        homeHealthData={homeHealthData}
      />
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Dashboard Error</h1>
        <p className="text-gray-600">Unable to load dashboard data. Please try again later.</p>
        <pre className="mt-4 text-left text-xs bg-gray-100 p-4 rounded overflow-auto max-w-2xl mx-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}
