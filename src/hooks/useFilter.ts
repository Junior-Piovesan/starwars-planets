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
  const [filter, setFilter] = useState<any>(INITIAL_STATE);
  const [filters, setFilters] = useState([]);

  const {
    planets,
    setplanetsFiltered,
  } = useContext(PlanetsContext);

  const handleChange = (
    { target: { name, value } }:any,
  ) => {
    setFilter({
      ...filter,
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
        .includes(filter.name));
    setplanetsFiltered(newPlanetsList);
  };

  const operationChosenFilter = (planet:any) => {
    switch (filter.comparison) {
      case 'maior que':
        return Number(planet[filter.column]) > Number(filter.value);
      case 'menor que':
        return Number(planet[filter.column]) < Number(filter.value);
      case 'igual a':
        return Number(planet[filter.column]) === Number(filter.value);
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
  }, [filter]);

  return [filter, handleChange, filterPlanetValues];
};

export default useFilter;
