import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetContext/PlanetsContext';
import { PlanetType } from '../types/types';

const INITIAL_STATE = {
  name: '',
};

const useFilter = () => {
  const {
    planets,
    setplanetsFiltered,
  } = useContext(PlanetsContext);

  const [filters, setFilters] = useState<any>(INITIAL_STATE);

  const handleChange = (
    { target: { name, value } }:any,
  ) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterPlanetName = () => {
    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => planet.name
        .includes(filters.name));
    setplanetsFiltered(newPlanetsList);
  };

  useEffect(() => {
    filterPlanetName();
    console.log('effect useFilter');
  }, [filters]);

  return [filters, handleChange];
};

export default useFilter;
