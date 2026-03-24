'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Sector = 'hospice' | 'home_health';

interface SectorContextType {
  sector: Sector;
  setSector: (sector: Sector) => void;
  toggleSector: () => void;
  sectorLabel: string;
  sectorTable: string;
  sectorColor: string;
  sectorIcon: string;
}

const SectorContext = createContext<SectorContextType>({
  sector: 'hospice',
  setSector: () => {},
  toggleSector: () => {},
  sectorLabel: 'Hospice',
  sectorTable: 'hospice_providers',
  sectorColor: 'turquoise',
  sectorIcon: 'heart',
});

export const useSector = () => useContext(SectorContext);

const SECTOR_META: Record<Sector, { label: string; table: string; color: string; icon: string; subtitle: string }> = {
  hospice: {
    label: 'Hospice',
    table: 'hospice_providers',
    color: 'turquoise',
    icon: 'heart',
    subtitle: 'Hospice M&A Intelligence',
  },
  home_health: {
    label: 'Home Health',
    table: 'home_health_providers',
    color: 'blue',
    icon: 'home',
    subtitle: 'Home Health M&A Intelligence',
  },
};

export { SECTOR_META };

export function SectorProvider({ children }: { children: React.ReactNode }) {
  const [sector, setSectorState] = useState<Sector>('hospice');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('activeSector') as Sector | null;
    if (saved && (saved === 'hospice' || saved === 'home_health')) {
      setSectorState(saved);
    }
  }, []);

  const setSector = useCallback((s: Sector) => {
    setSectorState(s);
    localStorage.setItem('activeSector', s);
  }, []);

  const toggleSector = useCallback(() => {
    setSector(sector === 'hospice' ? 'home_health' : 'hospice');
  }, [sector, setSector]);

  const meta = SECTOR_META[sector];

  return (
    <SectorContext.Provider
      value={{
        sector,
        setSector,
        toggleSector,
        sectorLabel: meta.label,
        sectorTable: meta.table,
        sectorColor: meta.color,
        sectorIcon: meta.icon,
      }}
    >
      {children}
    </SectorContext.Provider>
  );
}
