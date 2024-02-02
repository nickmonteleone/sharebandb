import "./NavBar.css";
import { NavLink } from "react-router-dom";

/** NavBar component for navigation
 *
 * Props:
 * - isLoggedIn (true/false)
 *
 * States:
 * - None
 *
 * App -> NavBar
 */

function NavBar({ isLoggedIn }) {
  return (
    <div className="NavBar">
      <NavLink className="NavBar-link" to="/">
        ShareB&B
      </NavLink>
      {
        (!isLoggedIn)
          ? <>
            <NavLink className="NavBar-link" to="/login">
              Login
            </NavLink>
            <NavLink className="NavBar-link" to="/signup">
              Signup
            </NavLink>
          </>
          : <>
            <NavLink className="NavBar-link" to="/listings/new">
              Add a listing
            </NavLink>
          </>
      }
      <NavLink className="NavBar-link" to="/listings">
        View listings
      </NavLink>
    </div>
  );
}

export default NavBar;
