import { useContext } from 'react';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import ListTableBody from '../listTableBody/ListTableBody';

import styles from './table.module.css';

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
    <table className={ styles.table }>
      <thead className={ styles.tableHead }>
        <tr className={ styles.trHead }>
          <th className={ styles.name }>Name</th>
          <th className={ styles.rotationPeriod }>Rotation Period</th>
          <th className={ styles.orbitalPeriod }>Orbital Period</th>
          <th className={ styles.diameter }>Diameter</th>
          <th className={ styles.climate }>Climate</th>
          <th className={ styles.gravity }>Gravity</th>
          <th className={ styles.terrain }>Terrain</th>
          <th className={ styles.surfaceWater }>Surface Water</th>
          <th className={ styles.population }>Population</th>
          <th className={ styles.films }>Films</th>
          <th className={ styles.created }>Created</th>
          <th className={ styles.edited }>Edited</th>
          <th className={ styles.url }>URL</th>
        </tr>
      </thead>
      <tbody className={ styles.tableBody }>

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
