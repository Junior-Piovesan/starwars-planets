import { useContext } from 'react';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import ListTableBody from '../listTableBody/ListTableBody';

import './table.css';
import { FilterType } from '../../types/types';

export default function Table() {
  const { filters, planetsFiltered } = useContext(PlanetsContext);

  const operationChosenFilter = (planet:any, fil:FilterType) => {
    switch (fil.comparison) {
      case 'maior que':

        return planet[fil.column] > Number(fil.value);
      case 'menor que':

        return planet[fil.column] < Number(fil.value);
      case 'igual a':

        return Number(planet[fil.column]) === Number(fil.value);
      default:
        break;
    }
  };

  return (
    <table className="table">
      <thead className="table-heade">
        <tr className="table-row-heade">
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody className="table-body">

        {
          planetsFiltered
            .filter((planet) => filters
              .every((filter) => operationChosenFilter(planet, filter)))
            .map((planet) => (
              <ListTableBody
                key={ planet.name }
                planet={ planet }
              />
            ))
         }

      </tbody>
    </table>
  );
}
