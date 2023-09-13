import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetContext/PlanetsContext';

const INITIAL_STATE = {
  name: '',
};

const useFilter = () => {
  const {
    planetsInfo,
    setPlanets,
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
    const newPlanetsList = planetsInfo
      .filter((planet) => planet.name
        .includes(filters.name));
    // console.log(newPlanetsList);
    setPlanets(newPlanetsList);
  };

  useEffect(() => {
    filterPlanetName();
    // console.log(newPlanetsList);

    // setPlanetsInfo(newPlanetsList);
  }, [filters]);

  return [filters, handleChange];
};

export default useFilter;
