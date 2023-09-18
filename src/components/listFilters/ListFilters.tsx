import React from 'react';
import { FilterType } from '../../types/types';
import FilterList from '../filtersList/FilterList';
import removeFilter from '../../utils/removeFilter';

type PropTypes = {
  filters:FilterType[]
  columnList:string[]
  setColumnList:(e:string[]) => void
  setFilters:(e:FilterType[]) => void
  combinesFiltersColumns:() => void
};

export default function ListFilters({
  filters,
  columnList,
  setColumnList,
  setFilters,
  combinesFiltersColumns,
}:PropTypes) {
  return (

    <div>
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
    </div>
  );
}
