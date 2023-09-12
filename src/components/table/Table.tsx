import React, { useContext } from 'react';
import PlanetsContext from '../../context/planetContext/PlanetsContext';

export default function Table() {
  const { planetsInfo } = useContext(PlanetsContext);
  return (
    <table>
      <thead>
        <tr>
          t
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
      <tbody>
        {planetsInfo.map(({
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
        }) => (
          <tr key={ name }>
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
        ))}
      </tbody>
    </table>
  );
}
