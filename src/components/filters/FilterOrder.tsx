import { FilterType } from '../../types/types';

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
    <section>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          ordinatedplanets();
        } }
      >
        <select
          onChange={ handleChangeOrder }
          name="column"
          value={ filter.order.column }
          data-testid="column-sort"
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

        <div>
          <label htmlFor="asc">
            Ascending
            <input
              onChange={ handleChangeOrder }
              id="asc"
              type="radio"
              name="sort"
              value="ASC"
              data-testid="column-sort-input-asc"
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
            />
          </label>
        </div>

        <button
          data-testid="column-sort-button"
        >
          Order
        </button>
      </form>
    </section>
  );
}
