import './App.css';
import { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';
import { jwtDecode as decode } from "jwt-decode";
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

  const isLoggedIn = (currentUsername !== null)
  console.log("App loaded, user:", currentUsername, isLoggedIn)

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decode(token).data;
            // put the token on the Api class so it can use it to call the API.
            ShareBAndBApi.token = token;
            console.log("decoded token", decode(token))
            console.log("decoded username", username)


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
  async function login(loginData){
    const token = await ShareBAndBApi.login(
      loginData.username,
      loginData.password,
    );
    setToken(token);
  }

  /**signup to site */
  async function signup(loginData){
    const token = await ShareBAndBApi.signup(
      loginData.username,
      loginData.password
    );
    setToken(token);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar logout={logout} isLoggedIn={isLoggedIn}/>
        <RoutesList
          isLoggedIn={isLoggedIn}
          login={login}
          signup={signup}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
