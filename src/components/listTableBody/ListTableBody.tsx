import { PlanetType } from '../../types/types';
import './listTableBody.css';

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

    <tr className="table-row-body">
      <td className="planet-info">{name}</td>
      <td className="planet-info">{ rotation_period }</td>
      <td className="planet-info">{orbital_period}</td>
      <td className="planet-info">{diameter}</td>
      <td className="planet-info">{climate}</td>
      <td className="planet-info">{gravity}</td>
      <td className="planet-info">{terrain}</td>
      <td className="planet-info">{surface_water}</td>
      <td className="planet-info">{population}</td>
      <td className="planet-info">{films}</td>
      <td className="planet-info">{created}</td>
      <td className="planet-info">{edited}</td>
      <td className="planet-info">{url}</td>
    </tr>
  );
}
