export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">YOUR DAILY DSA COMPANION</p>

        <h1>
          Master DSA.
          <br />
          <span>One Problem at a Time.</span>
        </h1>

        <p className="hero-description">
          Learn Data Structures and Algorithms through a structured
          roadmap, daily challenges, smart revision, and detailed
          progress tracking.
        </p>

        <div className="hero-buttons">
          <a href="/problems" className="primary-btn">
            Start Learning →
          </a>

          <a href="/topics" className="secondary-btn">
            Explore Roadmap
          </a>
        </div>
      </div>
    </section>
  );
}