'use client';

import { useSector } from './SectorProvider';
import { DashboardClient } from './DashboardClient';

interface DashboardData {
  stats: any;
  stateStats: any;
  topTargets: any;
  ownershipStats: any;
  adcDistribution: any;
  scoreDistribution: any;
  mapData: any;
  conComparison: any;
  endemicStats: any;
  pipelineStats: any;
}

export function DashboardWrapper({
  hospiceData,
  homeHealthData,
}: {
  hospiceData: DashboardData;
  homeHealthData: DashboardData;
}) {
  const { sector } = useSector();
  const data = sector === 'home_health' ? homeHealthData : hospiceData;

  return (
    <DashboardClient
      stats={data.stats}
      stateStats={data.stateStats as any}
      topTargets={data.topTargets as any}
      ownershipStats={data.ownershipStats as any}
      adcDistribution={data.adcDistribution as any}
      scoreDistribution={data.scoreDistribution as any}
      mapData={data.mapData as any}
      conComparison={data.conComparison as any}
      endemicStats={data.endemicStats as any}
      pipelineStats={data.pipelineStats as any}
    />
  );
}
