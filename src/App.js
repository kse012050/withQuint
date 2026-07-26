
import { BrowserRouter } from 'react-router-dom';
import Routers from './router/Routers'

function App() {
  const baseName = process.env.PUBLIC_URL || '/';

  return (
    <BrowserRouter basename={baseName}>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
