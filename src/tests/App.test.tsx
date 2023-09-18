import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'

import mockData from './mocks/mockData'

const MOCK_RESPONSE = {
  ok: true,
  json: async () => mockData,
} as Response;

beforeEach(() => vi.spyOn(global, 'fetch').mockResolvedValue({
  ok: true,
  json: async () => mockData,
} as Response));

afterEach(() =>  vi.spyOn(global,'fetch').mockClear())

test('Verifica se renderiza corretamente', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});
