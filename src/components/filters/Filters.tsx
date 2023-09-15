import { useContext, useEffect, useState } from 'react';
import { FilterType, PlanetType } from '../../types/types';
import FilterList from '../filtersList/FilterList';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import removeFilter from '../../utils/removeFilter';

const INITIAL_STATE = {
  name: '',
  column: '',
  comparison: 'maior que',
  value: '0',
};

const INITIAL_STATE_COLUMN_LIST = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Filters() {
  const [filter, setFilter] = useState<any>(INITIAL_STATE);
  const [columnList, setColumnList] = useState(INITIAL_STATE_COLUMN_LIST);

  const {
    planets,
    filters,
    setFilters,
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

  useEffect(() => {
    filterPlanetName();

    updateColumnList();

    console.log('oi');
  }, [filter.name || filters]);

  return (
    <section>
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          addFilter();
        } }
      >

        <div>
          <input
            data-testid="name-filter"
            onChange={ handleChange }
            placeholder="filter by name"
            type="text"
            value={ filter.name }
            name="name"
          />
        </div>

        <div>

          <select
            onChange={ handleChange }
            data-testid="column-filter"
            name="column"
            value={ filter.column }
          >
            {columnList
              .filter((info) => filters
                .every((element) => info !== element.column))
              .map((info) => (
                <option
                  key={ info }
                  value={ info }
                >
                  {info}
                </option>
              ))}
          </select>

          <select
            onChange={ handleChange }
            data-testid="comparison-filter"
            name="comparison"
            value={ filter.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <input
            onChange={ handleChange }
            data-testid="value-filter"
            type="number"
            name="value"
            value={ filter.value }
          />
          <button
            data-testid="button-filter"
          >
            Filtrar
          </button>
        </div>
      </form>

      {filters.length > 0 && (
        <section
          className="filter-list-container"
        >
          {filters.map((element:FilterType) => (
            <FilterList
              key={ element.id }
              columnList={ columnList }
              setColumnList={ setColumnList }
              filter={ element }
            />
          ))}

          <button
            onClick={ () => {
              removeFilter(filters, setFilters, null);
              combinesFiltersColumns();
            } }
            data-testid="button-remove-filters"
          >
            Remove all filters
          </button>
        </section>
      )}

    </section>
  );
}
