import React, { useContext } from 'react';
import Table from '../../components/table/Table';
import Filters from '../../components/filters/Filters';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import './home.css';

export default function Home() {
  const { loading } = useContext(PlanetsContext);
  return (
    <section className="home-container">
      <Filters />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Table />
      )}
    </section>
  );
}
