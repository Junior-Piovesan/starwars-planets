import { useContext } from 'react';
import { FilterType } from '../../types/types';
import './filterList.css';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import removeFilter from '../../utils/removeFilter';

type PropTypes = {
  filter:FilterType
  columnList:string[]
  setColumnList:(column:string[]) => void
};

export default function FilterList({ filter, columnList, setColumnList }:PropTypes) {
  const {
    filters,
    setFilters,
  } = useContext(PlanetsContext);

  return (
    <div
      data-testid="filter"
      className="card-filter"
    >
      <p>{filter.column}</p>
      <p>{filter.comparison}</p>
      <p>{filter.value}</p>
      <button
        onClick={ () => {
          removeFilter(filters, setFilters, filter.id);
          setColumnList([filter.column, ...columnList]);
        } }
      >
        Remove
      </button>
    </div>
  );
}
