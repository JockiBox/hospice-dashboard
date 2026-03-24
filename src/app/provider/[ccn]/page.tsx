import { getProvider, getRelatedProviders, calculateOwnerCarryBackScore, getSimilarProviders, getDataQualityScore, type Sector } from '@/lib/db';
import { ProviderDetailClient } from '@/components/ProviderDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ ccn: string }>;
  searchParams: Promise<{ sector?: string }>;
}

export default async function ProviderDetailPage({ params, searchParams }: Props) {
  const { ccn } = await params;
  const sp = await searchParams;
  const sector = (sp.sector === 'home_health' ? 'home_health' : 'hospice') as Sector;

  const provider = await getProvider(ccn, sector);

  if (!provider) {
    notFound();
  }

  const relatedProviders = await getRelatedProviders(ccn, provider.state, provider.city, 5, sector);
  const similarProviders = await getSimilarProviders(ccn, 5, sector);
  const dataQuality = await getDataQualityScore(ccn, sector);
  const carryBackAnalysis = calculateOwnerCarryBackScore(provider);

  return (
    <ProviderDetailClient
      provider={provider}
      relatedProviders={relatedProviders}
      similarProviders={similarProviders || []}
      dataQuality={dataQuality}
      carryBackAnalysis={carryBackAnalysis}
    />
  );
}
