
import { BrowserRouter } from 'react-router-dom';
import Routers from './router/Routers'

function App() {
  const baseName = window.location.hostname === 'localhost' ? '/' : '/WithQuant';

  return (
    <BrowserRouter basename={baseName}>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
