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

  /** Add a listing to app */
  async function addListing(listingData) {
    console.log('adding listing', listingData);
  }

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
