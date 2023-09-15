import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetContext/PlanetsContext';
import { FilterType, PlanetType } from '../types/types';

const INITIAL_STATE = {
  name: '',
  column: 'population',
  comparison: 'maior que',
  value: '0',
};

const useFilter = () => {
  const [filter, setFilter] = useState<any>(INITIAL_STATE);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const {
    planets,
    // planetsFiltered,
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

  // filtra pelo campo de filtragem pelo nome
  const filterPlanetName = () => {
    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => planet.name
        .includes(filter.name));
    setplanetsFiltered(newPlanetsList);
  };

  // Adiciona filtro atual na lista de filtros
  const addFilter = () => {
    const newFilter = {
      id: filters.length,
      ...filter,
    };
    setFilters((prev) => [...prev, newFilter]);
  };

  // // Verifica qual operão escolhida pelos campos de filtragem numérica
  const operationChosenFilter = (planet:any, fil:FilterType) => {
    switch (fil.comparison) {
      case 'maior que':
        // return console.log('maior');

        return planet[fil.column] > Number(fil.value);
      case 'menor que':
        // return console.log('menor');

        return planet[fil.column] < Number(fil.value);
      case 'igual a':
        // return console.log('igula');

        return planet[fil.column] === Number(fil.value);
      default:
        break;
    }
  };

  // Verifica qual operão escolhida pelos campos de filtragem numérica
  // const operationChosenFilter = (planet:any) => {
  //   switch (filter.comparison) {
  //     case 'maior que':
  //       return console.log('maior');

  //       // return planet[fil.column] > Number(fil.value);
  //     case 'menor que':
  //       return console.log('menor');

  //       // return planet[fil.column] < Number(fil.value);
  //     case 'igual a':
  //       return console.log('igula');

  //       // return planet[fil.column] === Number(fil.value);
  //     default:
  //       break;
  //   }
  // };

  // filtra pelo campo de filtragem pelos filtros numéricos
  // const filterPlanetValues = () => {
  //   addFilter();

  //   const newPlanetsList:PlanetType[] = planets
  //     .filter((planet) => operationChosenFilter(planet));

  //   setplanetsFiltered(newPlanetsList);
  // };

  const filterPlanetValues = () => {
    // addFilter();

    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => filters.every((fil) => operationChosenFilter(planet, fil)));
    setplanetsFiltered(newPlanetsList);
    return console.log(filters);

    // setTimeout(() => {
    //   const newPlanetsList:PlanetType[] = planets
    //     .filter((planet) => filters.every((fil) => operationChosenFilter(planet, fil)));
    //   setplanetsFiltered(newPlanetsList);
    // }, 5000);
  };

  useEffect(() => {
    filterPlanetName();
  }, [filter]);

  return { filter, filters, handleChange, filterPlanetValues, addFilter };
};

export default useFilter;
