import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

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

function NavBar({ isLoggedIn, logout }) {
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
            <Link className="NavBar-link"  onClick={logout} to="/">
              Logout
            </Link>
          </>
      }
      <NavLink className="NavBar-link" to="/listings">
        View listings
      </NavLink>
    </div>
  );
}

export default NavBar;
