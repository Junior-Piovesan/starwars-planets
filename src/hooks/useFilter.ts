import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetContext/PlanetsContext';
import { PlanetType } from '../types/types';

const INITIAL_STATE = {
  name: '',
  column: 'population',
  comparison: 'maior que',
  value: '0',
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

  // const comparation = () => {
  //   if (filters.comparison === 'maior que') {

  //   }
  // };

  const filterPlanetName = () => {
    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => planet.name
        .includes(filters.name));
    setplanetsFiltered(newPlanetsList);
  };

  const operationChosenFilter = (planet:any) => {
    switch (filters.comparison) {
      case 'maior que':
        return Number(planet[filters.column]) > Number(filters.value);
      case 'menor que':
        return Number(planet[filters.column]) < Number(filters.value);
      case 'igual a':
        return Number(planet[filters.column]) === Number(filters.value);
      default:
        break;
    }

    // if (filters.comparison === 'maior que') {
    //   return filters.column > filters.value;
    // }
    // if (filters.comparison === 'menor que') {
    //   return filters.column < filters.value;
    // } if (filters.comparison === 'igual a') {
    //   return filters.column === filters.value;
    // }
  };

  const filterPlanetValues = () => {
    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => operationChosenFilter(planet));

    setplanetsFiltered(newPlanetsList);
    // setFilters(INITIAL_STATE);

    // console.log('clicou');
    // console.log(newPlanetsList);
  };

  useEffect(() => {
    filterPlanetName();
    // console.log('effect useFilter');
    // console.log(filters);
  }, [filters]);

  return [filters, handleChange, filterPlanetValues];
};

export default useFilter;
