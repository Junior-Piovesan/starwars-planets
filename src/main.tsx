import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './context/planetsProvider/PlanetsProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
