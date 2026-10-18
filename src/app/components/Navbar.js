"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        Daily<span>DSA</span>
      </div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/problems">Problems</Link>
        <Link href="/topics">Roadmap</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      <div className="nav-actions">
        <ThemeToggle />
        {user ? (
          <>
            <span className="welcome-user">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="login-btn">
              Login
            </Link>

            <Link href="/signup" className="signup-btn">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}