import { useEffect, useMemo, useState } from 'react';
import PlanetsContext from '../planetContext/PlanetsContext';
import { FilterType, PlanetType } from '../../types/types';
import { fetchPlanets } from '../../utils/fetchPlanets';

type PropsType = {
  children:React.ReactNode
};

export default function PlanetsProvider({ children }:PropsType) {
  const [filters, setFilters] = useState<FilterType[]>([]);

  const [planets, setPlanets] = useState<PlanetType[]>([]);

  const [planetsFiltered, setplanetsFiltered] = useState<PlanetType[]>(planets);

  const [loading, setLoading] = useState<boolean>(true);

  // seta o estado global com informações dos planetas e retira a propriedade residents também seta o loading
  const getPlanets = async () => {
    setLoading(true);
    const dataPlanets = await fetchPlanets();

    dataPlanets.forEach((planet:any) => {
      delete planet.residents;
    });

    setPlanets(dataPlanets);
    setplanetsFiltered(dataPlanets);
    setLoading(false);
  };

  const context = useMemo(() => ({
    planets,
    setPlanets,
    planetsFiltered,
    filters,
    setFilters,
    setplanetsFiltered,
    loading,
  }), [planets, planetsFiltered, loading, filters]);

  useEffect(() => {
    getPlanets();
  }, []);
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}
