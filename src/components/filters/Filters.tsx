// import React, { useState } from 'react';
// import InputText from '../inputText/InputText';
import useFilter from '../../hooks/useFilter';

// const INITIAL_STATE = {
//   name: '',
// };

export default function Filters() {
  // const [filters, setFilters] = useState(INITIAL_STATE);

  const [filter, handleChange, filterPlanetValues] = useFilter();

  // const handleChange = (
  //   { target: { name, value } }:React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setFilters({
  //     ...filters,
  //     [name]: value,
  //   });
  // };
  // console.log(filters.name);

  return (
    <section>
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          filterPlanetValues();
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
        {/* <InputText
          handleChange={ handleChange }
          name="name"
          label=" "
          value={ filters.name }
          placeholder="filter by name"
          testId="name-filter"
        /> */}
      </form>
    </section>
  );
}
