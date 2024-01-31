import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';

/** App component for sharebandb frontend
 *
 * Props:
 * -None
 *
 * States:
 * -None
 *
 * App -> {RoutesList, NavBar}
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
