import { getAllByText, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

  test('Verifica se ao filtrar pelo filtro de valores a tabela renderiza como esperado',async () => {
    const {debug} = render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});
    const selectColumn = screen.getByTestId('column-filter')
    const selectComparison = screen.getByTestId('comparison-filter')
    const valueInput = screen.getByTestId('value-filter')

    const buttonFilter = screen.getByTestId('button-filter')
    
    
    await waitForElementToBeRemoved(loading);


    await userEvent.selectOptions(selectColumn,'population')
    await userEvent.selectOptions(selectComparison,'maior que')
    await userEvent.type(valueInput,'08900')
    await userEvent.click(buttonFilter)

    const planets = screen.getAllByTestId('planet-name')
      
    expect(planets).toHaveLength(7)

    await userEvent.selectOptions(selectColumn,'surface_water')
    await userEvent.selectOptions(selectComparison,'menor que')
    await userEvent.click(buttonFilter)
    
    expect(screen.getAllByTestId('planet-name')).toHaveLength(6)

    const btnRemoveAll = screen.getByRole('button', {
      name: /remove all filters/i
    })

    await userEvent.click(btnRemoveAll)
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
    expect(btnRemoveAll).not.toBeInTheDocument()

  });

  test('Verifica se comportamento dos botões de remover filtro',async () => {
    render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});
    const selectColumn = screen.getByTestId('column-filter')
    const selectComparison = screen.getByTestId('comparison-filter')
    const valueInput = screen.getByTestId('value-filter')

    const buttonFilter = screen.getByTestId('button-filter')
    
    
    await waitForElementToBeRemoved(loading);


    await userEvent.selectOptions(selectColumn,'population')
    await userEvent.selectOptions(selectComparison,'maior que')
    await userEvent.type(valueInput,'08900')
    await userEvent.click(buttonFilter)

    const planets = screen.getAllByTestId('planet-name')
      
    expect(planets).toHaveLength(7)

    await userEvent.selectOptions(selectColumn,'surface_water')
    await userEvent.selectOptions(selectComparison,'menor que')
    await userEvent.click(buttonFilter)
    
    expect(screen.getAllByTestId('planet-name')).toHaveLength(6)

    const btnRemove = screen.getAllByText('Remove')

    await userEvent.click(btnRemove[1])

    expect(planets).toHaveLength(7)
  })

  test('Verifica se a tabela é ordenada como esperado',async () => {
   render( 
      <PlanetsProvider>
        <App />
      </PlanetsProvider> );


    const loading = screen.getByRole('heading',{level:2});

    
    const descInput = screen.getByRole('radio', {
      name: /downward/i
    });

    const ascInput = screen.getByText(/ascending/i);
    
    
    
    const btnorder = screen.getByRole('button', {
      name: /order/i
    });
    
    
    await waitForElementToBeRemoved(loading);
    
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine');

    await userEvent.click(descInput);

    await userEvent.click(btnorder);

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant');

    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Dagobah');

    await userEvent.click(ascInput);
    await userEvent.click(btnorder);

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV');

    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Dagobah');
  });
});

