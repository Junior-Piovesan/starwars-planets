import { useContext, useEffect, useState } from 'react';
import { PlanetType } from '../../types/types';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import FiltersValue from './FiltersValue';
import ListFilters from '../listFilters/ListFilters';
import FilterOrder from './FilterOrder';

const INITIAL_STATE = {
  name: '',
  column: '',
  comparison: 'maior que',
  value: '0',
  order: { column: 'population', sort: 'ASC' },
};

const INITIAL_STATE_COLUMN_LIST = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Filters() {
  const [filter, setFilter] = useState(INITIAL_STATE);
  const [columnList, setColumnList] = useState(INITIAL_STATE_COLUMN_LIST);
  const [dropOrdering, setdropOrdering] = useState(INITIAL_STATE_COLUMN_LIST);

  const {
    planets,
    filters,
    setFilters,
    planetsFiltered,
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

  const handleChangeOrder = ({ target: { name, value } }:any) => {
    setFilter({
      ...filter,
      order: {
        ...filter.order,
        [name]: value,
      },
    });
  };

  // filtra pelo campo de filtragem pelo nome
  const filterPlanetName = () => {
    const newPlanetsList:PlanetType[] = planets
      .filter((planet) => planet.name
        .includes(filter.name));
    setplanetsFiltered(newPlanetsList);
  };

  const addFilter = () => {
    const newFilter = {
      id: filters.length,
      ...filter,
    };
    setFilters([...filters, newFilter]);
  };

  const updateColumnList = () => {
    const newArray = columnList
      .filter((info) => filters
        .every((element) => info !== element.column));

    setColumnList(newArray);

    if (filter.column === '') {
      setFilter({
        ...filter,
        column: columnList[0],
      });
    } else {
      setFilter({
        ...filter,
        column: columnList[1],
      });
    }
  };

  const combinesFiltersColumns = () => {
    const newArray:string[] | any = filters
      .map(
        (element) => (typeof element.column === 'string' ? element.column : undefined),
      );
    setColumnList([...newArray, ...columnList]);
  };

  const ordinatedplanets = () => {
    if (filter.order.sort === 'ASC') {
      const ordenedPlanets = planetsFiltered
        .sort((a:any, b:any) => (
          Number(a[filter.order.column]) - Number(b[filter.order.column])));
      setplanetsFiltered([...ordenedPlanets]);
    } else {
      const ordenedPlanets = planetsFiltered
        .sort((a:any, b:any) => (
          Number(a[filter.order.column]) + Number(b[filter.order.column])));
      setplanetsFiltered([...ordenedPlanets]);
    }
  };

  useEffect(() => {
    filterPlanetName();

    updateColumnList();
  }, [filter.name, filters]);
console.log(filter.order);

  return (
    <section>
      <FiltersValue
        addFilter={ addFilter }
        handleChange={ handleChange }
        filter={ filter }
        filters={ filters }
        columnList={ columnList }
      />

      <FilterOrder
        filter={ filter }
        dropOrdering={ dropOrdering }
        ordinatedplanets={ ordinatedplanets }
        handleChangeOrder={ handleChangeOrder }
      />

      <ListFilters
        filters={ filters }
        columnList={ columnList }
        setColumnList={ setColumnList }
        setFilters={ setFilters }
        combinesFiltersColumns={ combinesFiltersColumns }
      />
    </section>
  );
}
