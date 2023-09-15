import { useContext, useEffect, useState } from 'react';
import { FilterType, PlanetType } from '../../types/types';
import FilterList from '../filtersList/FilterList';
import PlanetsContext from '../../context/planetContext/PlanetsContext';

const INITIAL_STATE = {
  name: '',
  column: 'population',
  comparison: 'maior que',
  value: '0',
};

export default function Filters() {
  const [filter, setFilter] = useState<any>(INITIAL_STATE);

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

  useEffect(() => {
    filterPlanetName();
  }, [filter]);

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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
        <section className="filter-list-container">
          {filters.map((element:FilterType) => (
            <FilterList key={ element.id } filter={ element } />
          ))}
        </section>
      )}

    </section>
  );
}
