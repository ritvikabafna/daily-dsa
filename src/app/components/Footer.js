import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>DailyDSA</h3>

        <p>
          Build consistency. Solve problems. Master DSA.
        </p>
      </div>

      <div className="footer-links">
        <Link href="/problems">Problems</Link>
        <Link href="/topics">Roadmap</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      <p className="copyright">
        © 2026 Daily DSA. All rights reserved.
      </p>
    </footer>
  );
}