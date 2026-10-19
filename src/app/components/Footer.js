import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand-column">
          <Link href="/" className="footer-logo">
            <span className="logo-icon">⚡</span>
            <span>Daily<span className="logo-accent">DSA</span></span>
          </Link>
          <p className="footer-tagline">
            Build unshakeable problem-solving consistency. Master Data Structures and
            Algorithms with daily challenges and Socratic AI mentorship.
          </p>
          <div className="footer-system-status">
            <span className="status-indicator-dot" />
            <span className="status-text">Docker Sandbox: Online</span>
          </div>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-column-title">Platform</h4>
          <ul className="footer-links-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/problems">Problem Catalog</Link></li>
            <li><Link href="/topics">DSA Roadmap</Link></li>
            <li><Link href="/dashboard">Analytics Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-column-title">Features</h4>
          <ul className="footer-links-list">
            <li><Link href="/problems/1/solve">AI Code Coach</Link></li>
            <li><Link href="/dashboard">Spaced Repetition</Link></li>
            <li><Link href="/problems">Company Tags</Link></li>
            <li><Link href="/api/health">API Health Check</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-column-title">Account</h4>
          <ul className="footer-links-list">
            <li><Link href="/login">Sign In</Link></li>
            <li><Link href="/signup">Create Account</Link></li>
            <li><Link href="/dashboard">My Submissions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Daily DSA. Engineered for software engineers worldwide.
          </p>
          <div className="footer-bottom-badges">
            <span className="footer-badge">Next.js 16</span>
            <span className="footer-badge">Docker Isolated</span>
            <span className="footer-badge">Gemini 1.5</span>
          </div>
        </div>
      </div>
    </footer>
  );
}