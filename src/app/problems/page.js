"use client";

import { useState } from "react";
import problems from "../data/problems";

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  const topics = ["All", ...new Set(problems.map((problem) => problem.topic))];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" || problem.difficulty === difficulty;

    const matchesTopic =
      topic === "All" || problem.topic === topic;

    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <main className="problems-page">
      <div className="problems-header">
        <p className="page-tag">DSA PRACTICE</p>

        <h1>Problems</h1>

        <p>
          Practice problems, strengthen your concepts,
          and track your DSA progress.
        </p>
      </div>

      <div className="problem-filters">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        >
          {topics.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="problem-table-container">
        <table className="problem-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Problem</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Acceptance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.id}</td>

                <td>
                  <a href={`/problems/${problem.id}`}>
                    {problem.title}
                  </a>
                </td>

                <td>{problem.topic}</td>

                <td>
                  <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>

                <td>{problem.acceptance}%</td>

                <td>
                  <span className="status">
                    ○ Unsolved
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProblems.length === 0 && (
          <div className="no-results">
            <h3>No problems found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}