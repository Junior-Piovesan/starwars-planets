import { useEffect, useState } from 'react';
import PlanetsContext from '../planetContext/PlanetsContext';
import { PlanetType } from '../../types/types';
import fetchPlanets from '../../utils/fetchPlanets';

type PropsType = {
  children:React.ReactNode
};

export default function PlanetsProvider({ children }:PropsType) {
  const [planetsInfo, setPlanets] = useState<PlanetType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // seta o estado global com informações dos planetas e retira a propriedade residents também seta o loading
  const getPlanets = async () => {
    setLoading(true);
    const dataPlanets = await fetchPlanets();

    dataPlanets.forEach((planet:any) => {
      delete planet.residents;
    });

    setPlanets(dataPlanets);
    setLoading(false);
  };

  const context = {
    planetsInfo,
    setPlanets,
    loading,
  };

  useEffect(() => {
    getPlanets();
    console.log('efect do provaidr');
  }, []);
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}
