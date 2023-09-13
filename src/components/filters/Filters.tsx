// import React, { useState } from 'react';
import InputText from '../inputText/InputText';
import useFilter from '../../hooks/useFilter';

// const INITIAL_STATE = {
//   name: '',
// };

export default function Filters() {
  // const [filters, setFilters] = useState(INITIAL_STATE);

  const [filters, handleChange] = useFilter();

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
      <form>

        {/* <input
          onChange={ handleChange }
          placeholder="filter by name"
          type="text"
          value={ filters.name }
        /> */}
        <InputText
          handleChange={ handleChange }
          name="name"
          label=" "
          value={ filters.name }
          placeholder="filter by name"
          testId="name-filter"
        />
      </form>
    </section>
  );
}
