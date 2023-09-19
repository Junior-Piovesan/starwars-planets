import { PlanetType } from '../../types/types';
import styles from '../table/table.module.css';

type PropsType = {
  planet:PlanetType
};

export default function ListTableBody({ planet: {
  climate,
  created,
  diameter,
  edited,
  films,
  gravity,
  name,
  orbital_period,
  population,
  rotation_period,
  surface_water,
  terrain,
  url,
} }:PropsType) {
  return (

    <tr className={ styles.tr }>
      <td
        data-testid="planet-name"
        className={ styles.name }
      >
        {name}
      </td>
      <td className={ styles.rotationPeriod }>{ rotation_period }</td>
      <td className={ styles.orbitalPeriod }>{orbital_period}</td>
      <td className={ styles.diameter }>{diameter}</td>
      <td className={ styles.climate }>{climate}</td>
      <td className={ styles.gravity }>{gravity}</td>
      <td className={ styles.terrain }>{terrain}</td>
      <td className={ styles.surfaceWater }>{surface_water}</td>
      <td className={ styles.population }>{population}</td>
      <td className={ styles.films }>{ films }</td>
      <td className={ styles.created }>{created}</td>
      <td className={ styles.edited }>{edited}</td>
      <td className={ styles.url }>{url}</td>
    </tr>
  );
}
