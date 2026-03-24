'use client';

import { useSector } from './SectorProvider';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client component that syncs the sector context to the URL search params.
 * Server components that need sector can read it from searchParams.
 * When sector changes, this triggers a navigation to re-render the server component.
 */
export function SectorPageWrapper({ children }: { children: React.ReactNode }) {
  const { sector } = useSector();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentSector = searchParams.get('sector') || 'hospice';
    if (currentSector !== sector) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sector', sector);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [sector, pathname, searchParams, router]);

  return <>{children}</>;
}
