import React from 'react';
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "mytheme");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-sm btn-outline"
      onClick={() => setTheme(theme === "mytheme" ? "dark" : "mytheme")}
    >
      {theme === "mytheme" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
