"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsSuccess(false);
        setMessage(data.message || "Invalid email or password.");
        return;
      }

      setIsSuccess(true);
      setMessage("✓ Login successful! Redirecting to your dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    } catch (error) {
      console.error("Login frontend error:", error);
      setIsSuccess(false);
      setMessage("Unable to connect to authentication service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Top Header Bar */}
      <header className="auth-navbar">
        <Link href="/" className="auth-brand">
          <span className="auth-brand-bolt">⚡</span>
          <span className="auth-brand-text">Daily DSA</span>
        </Link>
        <div className="auth-nav-actions">
          <Link href="/problems" className="auth-nav-link">
            ← Explore Problems
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Centered Auth Card */}
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-glow-bar" />

          <div className="auth-card-header">
            <div className="auth-avatar-icon">
              <span>🔐</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to sync your progress, track your streak, and access your Socratic AI Coach.
            </p>
          </div>

          {message && (
            <div
              className={`auth-alert ${
                isSuccess ? "auth-alert-success" : "auth-alert-error"
              }`}
              role="alert"
            >
              <span className="alert-icon">{isSuccess ? "✓" : "⚠️"}</span>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="auth-form-group">
              <label htmlFor="login-email" className="auth-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="login-email"
                  type="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <div className="auth-label-row">
                <label htmlFor="login-password" className="auth-label">
                  Password
                </label>
              </div>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input with-toggle"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading || !email.trim() || !password.trim()}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In →</span>
              )}
            </button>
          </form>

          <div className="auth-card-footer">
            <p className="auth-switch-text">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="auth-switch-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Feature Badges under the Card */}
        <div className="auth-features-strip">
          <div className="auth-feature-pill">
            <span className="pill-icon">🔥</span>
            <span>Streak Heatmap</span>
          </div>
          <div className="auth-feature-pill">
            <span className="pill-icon">🤖</span>
            <span>Gemini Socratic AI</span>
          </div>
          <div className="auth-feature-pill">
            <span className="pill-icon">🔄</span>
            <span>Spaced Repetition</span>
          </div>
        </div>
      </main>
    </div>
  );
}