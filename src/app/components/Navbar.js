export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Daily<span>DSA</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/problems">Problems</a>
        <a href="/topics">Roadmap</a>
        <a href="/dashboard">Dashboard</a>
      </div>

      <div className="nav-actions">
        <a href="/login" className="login-btn">
          Login
        </a>

        <a href="/register" className="signup-btn">
          Get Started
        </a>
      </div>
    </nav>
  );
}