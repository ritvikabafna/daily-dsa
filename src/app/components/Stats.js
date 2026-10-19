export default function Stats() {
  const stats = [
    {
      value: "150+",
      label: "Curated DSA Problems",
      sublabel: "From LeetCode & Codeforces",
      icon: "🧩",
    },
    {
      value: "10+",
      label: "Core Data Structures",
      sublabel: "Arrays, Trees, Graphs & DP",
      icon: "📚",
    },
    {
      value: "< 50ms",
      label: "Sandbox Execution",
      sublabel: "Real Docker container runner",
      icon: "⚡",
    },
    {
      value: "100%",
      label: "Free & Open Source",
      sublabel: "No paywalls or premium tiers",
      icon: "🎁",
    },
  ];

  return (
    <section className="stats-section" aria-label="Platform Statistics">
      <div className="stats-container">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-icon-wrapper">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-sublabel">{stat.sublabel}</div>
          </div>
        ))}
      </div>
    </section>
  );
}