import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'

import mockData from './mocks/mockData'
import PlanetsProvider from '../context/planetsProvider/PlanetsProvider';
import PlanetsContext from '../context/planetContext/PlanetsContext';

const MOCK_RESPONSE = {
  ok: true,
  json: async () => mockData,
} as Response;

beforeEach(() => vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE));


afterEach(() =>  vi.spyOn(global,'fetch').mockClear());


describe('',() => {
  test('Verifica se renderiza texto de loading e os inputs', () => {
  render( 
  <PlanetsProvider>
    <App />
  </PlanetsProvider> );

  const loading = screen.getByRole('heading',{level:2});
  
  // form filtro por valores

  const inputText = screen.getByTestId('name-filter');
  const selectedValue = screen.getByTestId('column-filter');
  const selectedComparison = screen.getByTestId('comparison-filter');
  const inputNumber = screen.getByTestId('value-filter');
  const btnFilter = screen.getByTestId('button-filter');

  // form ordenação

  const inputComumnOrder = screen.getByTestId('column-sort');
  const radioAsc = screen.getByTestId('column-sort-input-asc');
  const radioDesc = screen.getByTestId('column-sort-input-desc');
  const btnSort = screen.getByTestId('column-sort-button');

  expect(loading).toBeInTheDocument()
  expect(inputText).toBeInTheDocument()
  expect(selectedValue).toBeInTheDocument()
  expect(selectedComparison).toBeInTheDocument()
  expect(inputNumber).toBeInTheDocument()
  expect(btnFilter).toBeInTheDocument()
  expect(inputComumnOrder).toBeInTheDocument()
  expect(radioAsc).toBeInTheDocument()
  expect(radioDesc).toBeInTheDocument()
  expect(btnSort).toBeInTheDocument()

});

  test('Verifica se ao carregar o texto sai da tela e renderiza informações dos planetas',async () => {
    const { debug } = render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});

    expect(loading).toBeInTheDocument()
    
    await waitForElementToBeRemoved(loading)
    
    const tableHead = screen.getAllByRole('columnheader')

    // const trPlanetInfo = screen.getAllByTestId('planet-name')
    
    expect(tableHead).toHaveLength(13)

      debug()
    
  })
})

