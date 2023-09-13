import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import ListTableBody from '../listTableBody/ListTableBody';
import useFilter from '../../hooks/useFilter';

import './table.css';

export default function Table() {
  const { planetsFiltered } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
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

        {planetsFiltered.map((planet) => (
          <ListTableBody
            key={ planet.name }
            planet={ planet }
          />
        ))}

      </tbody>
    </table>
  );
}
