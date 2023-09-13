// import React, { useState } from 'react';
// import InputText from '../inputText/InputText';
import useFilter from '../../hooks/useFilter';

// const INITIAL_STATE = {
//   name: '',
// };

export default function Filters() {
  // const [filters, setFilters] = useState(INITIAL_STATE);

  const [filters, handleChange, filterPlanetValues] = useFilter();

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
            value={ filters.name }
            name="name"
          />
        </div>

        <div>
          <select
            onChange={ handleChange }
            data-testid="column-filter"
            name="column"
            value={ filters.column }
          >
            <option value="population">Population</option>
            <option value="orbital_period">Orbital period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation period</option>
            <option value="surface_water">Surface water</option>
          </select>

          <select
            onChange={ handleChange }
            data-testid="comparison-filter"
            name="comparison"
            value={ filters.comparison }
          >
            <option value="maior que">Maior que</option>
            <option value="menor que">Menor que</option>
            <option value="igual a">Igual a</option>
          </select>

          <input
            onChange={ handleChange }
            data-testid="value-filter"
            type="number"
            name="value"
            value={ filters.value }
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
