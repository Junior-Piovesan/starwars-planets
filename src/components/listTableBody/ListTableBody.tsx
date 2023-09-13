import { PlanetType } from '../../types/types';

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

    <tr>
      <td>{name}</td>
      <td>{ rotation_period }</td>
      <td>{orbital_period}</td>
      <td>{diameter}</td>
      <td>{climate}</td>
      <td>{gravity}</td>
      <td>{terrain}</td>
      <td>{surface_water}</td>
      <td>{population}</td>
      <td>{films}</td>
      <td>{created}</td>
      <td>{edited}</td>
      <td>{url}</td>
    </tr>
  );
}
