import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `btn btn-ghost ${isActive ? "text-primary font-semibold" : "text-base-content"}`;

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold">Artify</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/explore" className={navLinkClass}>Explore Artworks</NavLink></li>
          <li><NavLink to="/add-artwork" className={navLinkClass}>Add Artwork</NavLink></li>
          <li><NavLink to="/my-gallery" className={navLinkClass}>My Gallery</NavLink></li>
          <li><NavLink to="/my-favorites" className={navLinkClass}>My Favorites</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
        <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
