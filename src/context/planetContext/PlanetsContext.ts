import { createContext } from 'react';
import { PlanetsContextType } from '../../types/types';

const PlanetsContext = createContext({} as PlanetsContextType);
export default PlanetsContext;
