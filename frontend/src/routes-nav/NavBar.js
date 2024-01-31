import "./NavBar.css";
import { NavLink } from "react-router-dom";

/** NavBar component for navigation
 *
 * Props:
 * - None
 *
 * States:
 * - None
 *
 * App -> NavBar
 */

function NavBar() {
  return (
    <div className="NavBar">
      <NavLink className="NavBar-link" to="/">
        ShareB&B
      </NavLink>
      <NavLink className="NavBar-link" to="/listings/new">
        Add a listing
      </NavLink>
      <NavLink className="NavBar-link" to="/listings">
        View listings
      </NavLink>
    </div>
  );
}

export default NavBar;
