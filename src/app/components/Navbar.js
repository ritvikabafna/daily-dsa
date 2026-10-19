"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link href="/" className="logo" aria-label="Daily DSA Home">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">
            Daily<span className="logo-accent">DSA</span>
          </span>
          <span className="logo-badge">PRO</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/problems"
            className={`nav-link ${isActive("/problems") ? "active" : ""}`}
          >
            Problems
          </Link>
          <Link
            href="/topics"
            className={`nav-link ${isActive("/topics") ? "active" : ""}`}
          >
            Roadmap
          </Link>
          <Link
            href="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
          >
            Dashboard
          </Link>
        </div>

        {/* Nav Actions */}
        <div className="nav-actions">
          <ThemeToggle />

          {user ? (
            <div className="user-profile-menu">
              <Link href="/dashboard" className="user-avatar-pill" title="Go to Dashboard">
                <span className="avatar-bubble">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="welcome-user-name">{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="logout-btn"
                aria-label="Logout"
                title="Sign out of your account"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons-group">
              <Link href="/login" className="login-btn">
                Log In
              </Link>

              <Link href="/signup" className="signup-btn">
                <span>Get Started</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <Link
            href="/"
            className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            🏠 Home
          </Link>
          <Link
            href="/problems"
            className={`mobile-nav-link ${isActive("/problems") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            🧩 Problems
          </Link>
          <Link
            href="/topics"
            className={`mobile-nav-link ${isActive("/topics") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            🗺️ Roadmap
          </Link>
          <Link
            href="/dashboard"
            className={`mobile-nav-link ${isActive("/dashboard") ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            📊 Dashboard
          </Link>

          <div className="mobile-menu-footer">
            {user ? (
              <div className="mobile-user-row">
                <span className="welcome-user">Signed in as {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-row">
                <Link href="/login" className="login-btn">
                  Log In
                </Link>
                <Link href="/signup" className="signup-btn">
                  Get Started →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}