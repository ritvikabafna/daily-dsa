import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero Section">
      {/* Ambient background glow elements */}
      <div className="hero-glow-blob hero-glow-blob-1" aria-hidden="true" />
      <div className="hero-glow-blob hero-glow-blob-2" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          {/* Announcement / Tag Pill */}
          <div className="hero-pill-badge">
            <span className="pill-dot" />
            <span className="pill-text">⚡ AI-Powered DSA Practice Platform</span>
            <span className="pill-chip">v2.0</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Master Algorithms.
            <br />
            <span className="hero-title-gradient">Build Lifetime Intuition.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            Crush technical interviews with structured topic roadmaps, automated
            spaced-repetition revisions, a real-time code runner, and an instant
            Gemini Socratic AI Coach that guides you without spoiling the answer.
          </p>

          {/* Call to Actions */}
          <div className="hero-buttons">
            <Link href="/problems" className="hero-primary-btn">
              <span>Start Solving Free</span>
              <span className="btn-arrow-icon">→</span>
            </Link>

            <Link href="/topics" className="hero-secondary-btn">
              <span>Explore Roadmap</span>
              <span className="btn-link-icon">🗺️</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text"><strong>Real Sandbox</strong> (C++ & Python)</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🤖</span>
              <span className="trust-text"><strong>Socratic AI</strong> Guidance</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔄</span>
              <span className="trust-text"><strong>Spaced Repetition</strong> Memory</span>
            </div>
          </div>
        </div>

        {/* Visual Hero Mockup / Interactive Code Preview */}
        <div className="hero-preview-wrapper" aria-hidden="true">
          <div className="hero-code-card">
            <div className="code-card-header">
              <div className="code-window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="code-window-title">solution.cpp • Daily DSA Sandbox</div>
              <div className="code-lang-tag">C++20</div>
            </div>

            <div className="code-card-body">
              <pre className="code-preview-pre">
                <code>
{`// Problem #1: Two Sum (Optimal Hash Map)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`}
                </code>
              </pre>

              {/* Execution Banner */}
              <div className="code-run-banner">
                <div className="verdict-chip success">
                  <span className="chip-icon">✓</span>
                  <span>Accepted</span>
                </div>
                <div className="runtime-stat">
                  <span>Runtime: <strong>0 ms</strong></span>
                  <span className="stat-separator">•</span>
                  <span>Memory: <strong>10.4 MB</strong> (Beats 98.6%)</span>
                </div>
              </div>

              {/* Socratic AI Coach Callout */}
              <div className="code-ai-callout">
                <div className="ai-callout-header">
                  <span className="ai-badge">🤖 Gemini AI Coach</span>
                  <span className="ai-badge-sub">Socratic Hint</span>
                </div>
                <p className="ai-callout-text">
                  &ldquo;Notice how storing previous values in a hash map turned an
                  O(N²) brute-force scan into an optimal O(N) single-pass lookup!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}