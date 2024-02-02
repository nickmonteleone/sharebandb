import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';
import ShareBAndBApi from './api/api';

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

  const [currentUsername, setCurrentUsername] = useState(null);
  const [token, setToken] = useLocalStorage("sharebandb-token");

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            ShareBAndBApi.token = token;

            setCurrentUsername(username);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUsername(null);
          }
        } else {
          setCurrentUsername(null);
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /**logout of site */
  function logout(){
    setCurrentUsername(null);
    setToken(null);
  }

  /**login to site */
  function login(loginData){
    const token =
      ShareBAndBApi.login(loginData.username, loginData.password);
    setToken(token);
  }

  /**signup to site */
  function signup(loginData){
    const token =
      ShareBAndBApi.signup(loginData.username, loginData.password);
    setToken(token);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar logout={logout}/>
        <RoutesList
          currentUsername={currentUsername}
          login={login}
          signup={signup}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
