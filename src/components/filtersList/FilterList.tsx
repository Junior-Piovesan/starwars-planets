import { FilterType } from '../../types/types';
import './filterList.css';

type PropTypes = {
  filter:FilterType
};

export default function FilterList({ filter }:PropTypes) {
  return (
    <div className="card-filter">
      <p>{filter.name}</p>
      <p>{filter.column}</p>
      <p>{filter.comparison}</p>
      <p>{filter.value}</p>
      <button>
        Remove
      </button>
    </div>
  );
}
