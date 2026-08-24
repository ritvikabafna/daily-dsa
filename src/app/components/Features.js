const features = [
  {
    icon: "📚",
    title: "Structured Roadmap",
    description:
      "Follow a carefully organized DSA curriculum from basics to advanced topics.",
  },
  {
    icon: "🔥",
    title: "Daily Challenges",
    description:
      "Solve problems every day and build a consistent DSA practice habit.",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    description:
      "Track your solved problems, accuracy, streaks, and topic-wise performance.",
  },
  {
    icon: "🧠",
    title: "Smart Recommendations",
    description:
      "Get problem recommendations based on your performance and weak areas.",
  },
  {
    icon: "🔄",
    title: "Smart Revision",
    description:
      "Automatically revisit problems using a spaced-repetition system.",
  },
  {
    icon: "🤖",
    title: "AI DSA Coach",
    description:
      "Get hints, explanations, and personalized guidance when you get stuck.",
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <div className="section-heading">
        <p>WHY DAILY DSA?</p>

        <h2>
          Everything you need to
          <br />
          <span>master DSA.</span>
        </h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}