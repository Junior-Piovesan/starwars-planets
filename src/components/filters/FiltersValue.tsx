import { FilterType } from '../../types/types';

import styles from './filters.module.css';

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
      className={ styles.formValue }
    >
      {/* {filtragen por Nome} */}

      <div className={ styles.inputNameBox }>
        <input
          className={ styles.inputName }
          data-testid="name-filter"
          onChange={ handleChange }
          placeholder="filter by name"
          type="text"
          value={ filter.name }
          name="name"
        />
      </div>

      {/* {filtragen de valores} */}

      <div className={ styles.filterValueBox }>

        <select
          onChange={ handleChange }
          data-testid="column-filter"
          name="column"
          value={ filter.column }
          className={ styles.selectValueColumn }
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
          className={ styles.selectValuecomparison }

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
          className={ styles.selectValueNumber }

        />
        <button
          data-testid="button-filter"
        >
          Filter
        </button>
      </div>

    </form>
  );
}
