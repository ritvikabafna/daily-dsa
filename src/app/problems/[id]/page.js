import problems from "../../data/problems";

export default async function ProblemPage({ params }) {
  const { id } = await params;

  const problem = problems.find(
    (item) => item.id === Number(id)
  );

  if (!problem) {
    return (
      <main className="problem-not-found">
        <h1>Problem Not Found</h1>
        <p>The problem you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="problem-page">
      <div className="problem-container">

        <div className="problem-top">
          <div>
            <p className="problem-topic">
              {problem.topic}
            </p>

            <h1>{problem.title}</h1>
          </div>

          <span
            className={`difficulty ${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="problem-meta">
          <span>
            Acceptance: {problem.acceptance}%
          </span>

          <span>
            Status: ○ Unsolved
          </span>
        </div>

        <section className="problem-section">
          <h2>Description</h2>

          <p>{problem.description}</p>
        </section>

        <section className="problem-section">
          <h2>Examples</h2>

          {problem.examples.map((example, index) => (
            <div className="example-box" key={index}>
              <h3>Example {index + 1}</h3>

              <p>
                <strong>Input:</strong>{" "}
                {example.input}
              </p>

              <p>
                <strong>Output:</strong>{" "}
                {example.output}
              </p>
            </div>
          ))}
        </section>

        <section className="problem-section">
          <h2>Constraints</h2>

          <ul>
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </section>

        <section className="problem-section">
          <h2>Topics</h2>

          <div className="tags">
            {problem.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <div className="solve-section">
          <a
            href={`/problems/${problem.id}/solve`}
            className="solve-button"
          >
          Solve Problem →
</a>
        </div>

      </div>
    </main>
  );
}