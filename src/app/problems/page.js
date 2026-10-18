"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import problems from "../data/problems";
import {
  ALL_COMPANIES,
  ALL_TAGS,
  enrichProblem,
} from "../data/problemMetadata";

export default function ProblemsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState("All Companies");
  const [pattern, setPattern] = useState("All Patterns");
  const [statusFilter, setStatusFilter] = useState("All");

  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const solved = problems
        .filter(
          (problem) =>
            localStorage.getItem(
              `problem-${problem.id}-solved`
            ) === "true"
        )
        .map((problem) => problem.id);

      setSolvedProblems(solved);
    }, 0);

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user && Array.isArray(data.user.solvedProblems)) {
          setSolvedProblems((prev) => [
            ...new Set([...prev, ...data.user.solvedProblems]),
          ]);

          data.user.solvedProblems.forEach((id) => {
            localStorage.setItem(`problem-${id}-solved`, "true");
          });
        }
      })
      .catch((err) => console.error(err));

    return () => clearTimeout(timer);
  }, []);

  const topics = ["All", ...new Set(problems.map((problem) => problem.topic))];

  const enrichedProblems = problems.map(enrichProblem);

  const filteredProblems = enrichedProblems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" || problem.difficulty === difficulty;

    const matchesTopic =
      topic === "All" || problem.topic === topic;

    const matchesCompany =
      company === "All Companies" || problem.companies?.includes(company);

    const matchesPattern =
      pattern === "All Patterns" || problem.tags?.includes(pattern);

    const isSolved = solvedProblems.includes(problem.id);
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Solved" && isSolved) ||
      (statusFilter === "Unsolved" && !isSolved);

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesTopic &&
      matchesCompany &&
      matchesPattern &&
      matchesStatus
    );
  });

  const handlePickRandom = () => {
    const pool = filteredProblems.length > 0 ? filteredProblems : enrichedProblems;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];
    if (chosen) {
      router.push(`/problems/${chosen.id}/solve`);
    }
  };

  const hasActiveFilters =
    search !== "" ||
    topic !== "All" ||
    difficulty !== "All" ||
    company !== "All Companies" ||
    pattern !== "All Patterns" ||
    statusFilter !== "All";

  const handleClearAllFilters = () => {
    setSearch("");
    setTopic("All");
    setDifficulty("All");
    setCompany("All Companies");
    setPattern("All Patterns");
    setStatusFilter("All");
  };

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
          aria-label="Search problems"
        />

        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          aria-label="Filter by Topic"
        >
          {topics.map((item) => (
            <option value={item} key={item}>
              {item === "All" ? "All Topics" : item}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          aria-label="Filter by Difficulty"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
          aria-label="Filter by Algorithmic Pattern"
        >
          {ALL_TAGS.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          aria-label="Filter by Company"
        >
          {ALL_COMPANIES.map((comp) => (
            <option value={comp} key={comp}>
              {comp}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by Status"
        >
          <option value="All">All Status</option>
          <option value="Solved">Solved</option>
          <option value="Unsolved">Unsolved</option>
        </select>

        <button
          type="button"
          onClick={handlePickRandom}
          className="random-btn"
          title="Pick a random problem from the current list"
        >
          🎲 Pick Random
        </button>
      </div>

      {hasActiveFilters && (
        <div className="active-filters-bar">
          <span className="active-filters-label">
            Active Filters:
          </span>
          {search && (
            <span className="active-filter-badge">
              Search: &quot;{search}&quot;
              <span className="clear-filter-x" onClick={() => setSearch("")}>×</span>
            </span>
          )}
          {topic !== "All" && (
            <span className="active-filter-badge">
              Topic: {topic}
              <span className="clear-filter-x" onClick={() => setTopic("All")}>×</span>
            </span>
          )}
          {difficulty !== "All" && (
            <span className="active-filter-badge">
              Diff: {difficulty}
              <span className="clear-filter-x" onClick={() => setDifficulty("All")}>×</span>
            </span>
          )}
          {pattern !== "All Patterns" && (
            <span className="active-filter-badge">
              Pattern: #{pattern}
              <span className="clear-filter-x" onClick={() => setPattern("All Patterns")}>×</span>
            </span>
          )}
          {company !== "All Companies" && (
            <span className="active-filter-badge">
              Company: 🏢 {company}
              <span className="clear-filter-x" onClick={() => setCompany("All Companies")}>×</span>
            </span>
          )}
          {statusFilter !== "All" && (
            <span className="active-filter-badge">
              Status: {statusFilter}
              <span className="clear-filter-x" onClick={() => setStatusFilter("All")}>×</span>
            </span>
          )}
          <button
            type="button"
            className="clear-all-btn"
            onClick={handleClearAllFilters}
          >
            Clear All
          </button>
        </div>
      )}

      <div className="problem-meta-bar">
        <span>
          Showing <strong>{filteredProblems.length}</strong> of {enrichedProblems.length} problems
        </span>
        <span>
          <strong>{solvedProblems.length}</strong> Solved
        </span>
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
                  <div className="problem-title-cell">
                    <Link
                      href={`/problems/${problem.id}`}
                      className="problem-title-link"
                    >
                      {problem.title}
                    </Link>

                    <div className="problem-tags-row">
                      {problem.companies?.slice(0, 3).map((comp) => (
                        <span
                          key={comp}
                          className="company-chip"
                          onClick={() => setCompany(comp)}
                          title={`Click to filter by ${comp}`}
                        >
                          🏢 {comp}
                        </span>
                      ))}

                      {problem.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="pattern-chip"
                          onClick={() => setPattern(t)}
                          title={`Click to filter by ${t}`}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
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
                    {solvedProblems.includes(problem.id)
                      ? "✓ Solved"
                      : "○ Unsolved"}
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