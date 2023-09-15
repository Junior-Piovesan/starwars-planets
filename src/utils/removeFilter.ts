import { FilterType } from '../types/types';

const removeFilter = (
  array:FilterType[],
  seter:(filter: FilterType[]) => void,
  id:number | null,
) => {
  if (id === null) {
    seter([]);
  } else {
    const newArray = array.filter((element) => element.id !== id);
    seter(newArray);
  }
};
export default removeFilter;
