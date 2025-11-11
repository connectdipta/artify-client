import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply & persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const navLinkClass = ({ isActive }) =>
    `btn btn-ghost ${isActive ? "text-primary font-semibold" : "text-base-content"}`;

  const handleLogout = async () => {
    await signOut(auth);
    Swal.fire("Logged out", "You have been signed out", "info");
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-bold">Artify</Link>
        </div>
        <div className="navbar-end">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* START */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/explore" className={navLinkClass}>Explore Artworks</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/add-artwork" className={navLinkClass}>Add Artwork</NavLink></li>
                <li><NavLink to="/my-gallery" className={navLinkClass}>My Gallery</NavLink></li>
                <li><NavLink to="/my-favorites" className={navLinkClass}>My Favorites</NavLink></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">Artify</Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/explore" className={navLinkClass}>Explore Artworks</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/add-artwork" className={navLinkClass}>Add Artwork</NavLink></li>
              <li><NavLink to="/my-gallery" className={navLinkClass}>My Gallery</NavLink></li>
              <li><NavLink to="/my-favorites" className={navLinkClass}>My Favorites</NavLink></li>
            </>
          )}
        </ul>
      </div>

      {/* END */}
      <div className="navbar-end gap-3">
        {/* Theme toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
            aria-label="Toggle theme"
          />
          <div className="swap-on text-xl">🌙</div>
          <div className="swap-off text-xl">☀️</div>
        </label>

        {/* Auth or dropdown */}
        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </label>

            {menuOpen && (
              <ul
                tabIndex={0}
                className="absolute top-full right-0 mt-2 z-50 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><span className="text-sm font-semibold">{user.displayName || "Welcome!"}</span></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
