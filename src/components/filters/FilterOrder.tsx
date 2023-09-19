import { FilterType } from '../../types/types';

import styles from './filters.module.css';

type PropsType = {
  filter:FilterType,
  dropOrdering:string[],
  handleChangeOrder:(e:any) => void
  ordinatedplanets:() => void
};

export default function FilterOrder({
  filter,
  dropOrdering,
  ordinatedplanets,
  handleChangeOrder,
}:PropsType) {
  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        ordinatedplanets();
      } }
      className={ styles.formOrder }
    >

      <div className={ styles.orderBox }>
        <select
          onChange={ handleChangeOrder }
          name="column"
          value={ filter.order.column }
          data-testid="column-sort"
          className={ styles.selectOrderColumn }
        >

          {dropOrdering
            .map((info) => (
              <option
                key={ info }
                value={ info }
              >
                {info}
              </option>
            ))}

        </select>
        <label htmlFor="asc">
          Ascending
          <input
            onChange={ handleChangeOrder }
            id="asc"
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            className={ styles.inputOrder }

          />
        </label>

        <label htmlFor="desc">
          Downward
          <input
            onChange={ handleChangeOrder }
            id="desc"
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            className={ styles.inputOrder }
          />
        </label>
        <button
          data-testid="column-sort-button"
        >
          Order
        </button>
      </div>

    </form>
  );
}
