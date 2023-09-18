// import { useContext, useEffect, useState } from 'react';
// import { FilterType, PlanetType } from '../../types/types';
// import FilterList from '../filtersList/FilterList';
// import PlanetsContext from '../../context/planetContext/PlanetsContext';
// import removeFilter from '../../utils/removeFilter';

import { FilterType } from '../../types/types';

// const INITIAL_STATE = {
//   name: '',
//   column: '',
//   comparison: 'maior que',
//   value: '0',
//   order: { column: '', sort: 'ASC' },
// };

// const INITIAL_STATE_COLUMN_LIST = [
//   'population',
//   'orbital_period',
//   'diameter',
//   'rotation_period',
//   'surface_water',
// ];

type PropTypes = {
  addFilter: () => void,
  handleChange: (e:any) => void,
  filter:FilterType,
  filters:FilterType[],
  columnList:string[],
};

export default function Filters({
  addFilter,
  handleChange,
  filter,
  filters,
  columnList,
}:PropTypes) {
  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        addFilter();
      } }
    >
      {/* {filtragen por Nome} */}

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

      {/* {filtragen de valores} */}

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
  );
}
