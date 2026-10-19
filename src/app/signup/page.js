"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match. Please verify both fields.");
      return;
    }

    if (formData.password.length < 6) {
      setIsSuccess(false);
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsSuccess(false);
        setMessage(data.message || "Failed to create account.");
        return;
      }

      setIsSuccess(true);
      setMessage("✓ Account created successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("Signup frontend error:", error);
      setIsSuccess(false);
      setMessage("Unable to reach authentication service. Please try again.");
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
              <span>🚀</span>
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join thousands of developers solving daily algorithmic challenges.
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

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-form-group">
              <label htmlFor="signup-name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">👤</span>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-email" className="auth-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="signup-password" className="auth-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="auth-input with-toggle"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            <div className="auth-form-group">
              <label htmlFor="signup-confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="signup-confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={
                loading ||
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                !formData.confirmPassword.trim()
              }
            >
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Get Started →</span>
              )}
            </button>
          </form>

          <div className="auth-card-footer">
            <p className="auth-switch-text">
              Already have an account?{" "}
              <Link href="/login" className="auth-switch-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}