import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleLogout = async () => {
    await signOut(auth);
    const currentTheme = localStorage.getItem("theme") || "light";
    Swal.fire({
      title: "Logged out",
      text: "You have been signed out",
      icon: "info",
      background: currentTheme === "dark" ? "#2A2F3A" : "oklch(98% 0.02 250)",
      color: currentTheme === "dark" ? "#ffffff" : "oklch(20% 0.07 250)",
    });
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-colors ${
      isActive
        ? "text-primary font-bold bg-primary/10"
        : "text-base-content/80 hover:text-primary"
    }`;
  
  const mobileNavLinkClass = ({ isActive }) =>
    `w-full text-left p-3 rounded-lg ${
      isActive
        ? "bg-primary text-primary-content font-bold"
        : "hover:bg-base-300"
    }`;


  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-md px-4 sm:px-8">
        <div className="navbar-start">
          <span className="text-xl font-bold text-base-content/50">Artify</span>
        </div>
        <div className="navbar-end">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sm:px-8 sticky top-0 z-50">
      
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden -ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><NavLink to="/" className={mobileNavLinkClass}>Home</NavLink></li>
            <li><NavLink to="/explore" className={mobileNavLinkClass}>Explore Artworks</NavLink></li>
            {user && (
              <>
                <div className="divider my-1"></div>
                <li><NavLink to="/add-artwork" className={mobileNavLinkClass}>Add Artwork</NavLink></li>
                <li><NavLink to="/my-gallery" className={mobileNavLinkClass}>My Gallery</NavLink></li>
                <li><NavLink to="/my-favorites" className={mobileNavLinkClass}>My Favorites</NavLink></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent !pl-0">
          Artify
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
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

      <div className="navbar-end gap-3">
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

        {!user ? (
          <>
            <Link to="/login" className="btn btn-secondary rounded-full btn-sm px-5">Login</Link>
            <Link to="/register" className="btn btn-primary rounded-full btn-sm px-5">Register</Link>
          </>
        ) : (
          <div className="dropdown dropdown-hover dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-60"
            >
              <li className="p-2">
                <span className="font-bold text-base-content text-center block truncate">
                  {user.displayName || "Welcome!"}
                </span>
                <span className="text-xs text-base-content/70 text-center block truncate">
                  {user.email}
                </span>
              </li>
              <div className="divider my-0"></div>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-ghost text-error btn-sm w-full justify-start"
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;