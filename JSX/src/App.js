import { Counter } from './features/Counter';
import { Weather } from './features/Weather';

function App() {
  return (
    <>
      <Counter />
      <Weather city="Braila" />
    </>
  );
}

export { App };
