import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
      <div className="swap-on text-xl">🌙</div>
      <div className="swap-off text-xl">☀️</div>
    </label>
  );
};

export default ThemeToggle;
