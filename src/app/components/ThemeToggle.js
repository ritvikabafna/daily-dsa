"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timer;
    const handleThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail);
      }
    };

    window.addEventListener("themechange", handleThemeChange);

    timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("daily_dsa_theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
      setMounted(true);
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("daily_dsa_theme", nextTheme);

    // Notify other components like Monaco editor
    window.dispatchEvent(
      new CustomEvent("themechange", { detail: nextTheme })
    );
  };

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift
    return (
      <button
        type="button"
        className={`theme-toggle-btn ${className}`}
        aria-label="Toggle dark mode"
        style={{ opacity: 0 }}
      >
        🌙
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <span className="theme-toggle-content">
          <span className="theme-toggle-icon">☀️</span>
          <span className="theme-toggle-label">Light</span>
        </span>
      ) : (
        <span className="theme-toggle-content">
          <span className="theme-toggle-icon">🌙</span>
          <span className="theme-toggle-label">Dark</span>
        </span>
      )}
    </button>
  );
}
