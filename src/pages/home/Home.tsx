import React, { useContext } from 'react';
import Table from '../../components/table/Table';
import PlanetsContext from '../../context/planetContext/PlanetsContext';
import styles from './home.module.css';
import Filters from '../../components/filters/Filters';

export default function Home() {
  const { loading } = useContext(PlanetsContext);
  return (
    <section className={ styles.homeContainer }>
      <div className={ styles.titleContainer }>
        <h1 className={ styles.title }>StarWars</h1>
        <h2 className={ styles.subTitle }>
          Planets
        </h2>
      </div>
      <Filters />
      {loading ? (
        <h2 className={ styles.loading }>Loading...</h2>
      ) : (
        <Table />
      )}
    </section>
  );
}
