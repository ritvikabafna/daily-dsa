const features = [
  {
    icon: "📚",
    category: "CURRICULUM",
    title: "Structured Topic Roadmaps",
    description:
      "Follow a carefully curated pathway from foundational Arrays & Strings to advanced Dynamic Programming, Graphs, and Heaps.",
    color: "#6366f1",
  },
  {
    icon: "🔥",
    category: "HABIT BUILDING",
    title: "Daily Practice Challenges",
    description:
      "A hand-picked problem every single day. Build an unbroken practice streak and reinforce problem-solving muscle memory.",
    color: "#f59e0b",
  },
  {
    icon: "🤖",
    category: "AI COACHING",
    title: "Socratic AI Code Coach",
    description:
      "Stuck on a tricky edge case? Get tailored conceptual nudges, complexity evaluations, and pseudo-code hints without revealing spoilers.",
    color: "#ec4899",
  },
  {
    icon: "🔄",
    category: "RETENTION",
    title: "Spaced-Repetition System",
    description:
      "Never forget a solved problem again. Daily DSA schedules intelligent revisions based on difficulty ratings to ensure long-term mastery.",
    color: "#8b5cf6",
  },
  {
    icon: "⚡",
    category: "EXECUTION",
    title: "Real Sandbox Code Runner",
    description:
      "Compile and execute your code in isolated C++20 and Python 3 Docker containers with instant testcase feedback and custom test inputs.",
    color: "#10b981",
  },
  {
    icon: "📊",
    category: "INSIGHTS",
    title: "In-Depth Analytics & Streaks",
    description:
      "Visualize your acceptance rates, weak topics, submission progression over time, and GitHub-style activity heatmaps.",
    color: "#3b82f6",
  },
];

export default function Features() {
  return (
    <section className="features-section" aria-label="Key Features">
      <div className="section-heading">
        <div className="section-pill-tag">WHY DAILY DSA</div>
        <h2 className="section-title">
          Engineered for <span className="text-gradient">Maximum Retention</span>
        </h2>
        <p className="section-subtitle">
          Everything you need to go from DSA beginner to cracking FAANG technical interviews.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-card-glow-edge" />
            <div className="feature-card-top">
              <div
                className="feature-icon-bubble"
                style={{ "--feature-accent": feature.color }}
              >
                <span>{feature.icon}</span>
              </div>
              <span className="feature-category-badge">{feature.category}</span>
            </div>

            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}