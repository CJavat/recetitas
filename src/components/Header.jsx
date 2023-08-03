import { useState, useEffect } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-black">
      <p>Header</p>
      <button
        className="bg-red-300 text-red-600 rounded-full border"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        Click for DarkMode
      </button>
    </div>
  );
};

export default Header;
