import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {vi} from 'vitest'

import mockData from './mocks/mockData'
import PlanetsProvider from '../context/planetsProvider/PlanetsProvider';
// import * as APIModule from  '../utils/fetchPlanets'

const MOCK_RESPONSE = {
  ok: true,
  json: async () => mockData,
} as Response;

beforeEach(() => vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE));
// beforeEach(() => vi.spyOn(APIModule, 'fetchPlanets').mockResolvedValue(mockData));


afterEach(() =>  vi.spyOn(global,'fetch').mockClear());
// afterEach(() =>  vi.spyOn(APIModule, 'fetchPlanets').mockClear());


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

    
    expect(tableHead).toHaveLength(13)
    
    const trPlanetInfo = screen.getAllByTestId('planet-name')
    expect(trPlanetInfo).toHaveLength(10)
    
  });

  test('Verifica se usar o filtro de nome dos planetas a tabela renderiza como deveria',async () => {
    const { debug } = render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});
    const inputText = screen.getByTestId('name-filter');
    
    
    await waitForElementToBeRemoved(loading)
    
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)


    await userEvent.type(inputText,'oo')

    expect(screen.getAllByTestId('planet-name')).toHaveLength(2)

    const tatooine = screen.getByText('Tatooine')
    const naboo = screen.getByText('Naboo')

    expect(tatooine).toBeInTheDocument()
    expect(naboo).toBeInTheDocument()
  })

  test('Verifica se ao clicar no botão filtro os planetas com população unknown saem da lista',async () => {
    render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});    

  const btnFilter = screen.getByTestId('button-filter');

    
    await waitForElementToBeRemoved(loading);

    await userEvent.click(btnFilter)

    expect(screen.getAllByTestId('planet-name')).toHaveLength(8)

      
  })

  test('Verifica se ao filtrar por valores a tabela renderiza corretamente',async () => {
    const { debug } = render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});

    const selectedValue = screen.getByTestId('column-filter');
    const selectedComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');

    const btnFilter = screen.getByTestId('button-filter');

    
    await waitForElementToBeRemoved(loading);

    await userEvent.click(selectedValue)


      
  })
})

