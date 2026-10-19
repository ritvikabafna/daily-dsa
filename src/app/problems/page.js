"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import problems from "../data/problems";
import {
  ALL_COMPANIES,
  ALL_TAGS,
  enrichProblem,
} from "../data/problemMetadata";

function ProblemsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get("topic");

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [company, setCompany] = useState("All Companies");
  const [pattern, setPattern] = useState("All Patterns");
  const [statusFilter, setStatusFilter] = useState("All");

  const topic = selectedTopic ?? (urlTopic || "All");

  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const solved = problems
        .filter(
          (problem) =>
            localStorage.getItem(`problem-${problem.id}-solved`) === "true"
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

    const matchesTopic = topic === "All" || problem.topic === topic;

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
    setSelectedTopic("All");
    setDifficulty("All");
    setCompany("All Companies");
    setPattern("All Patterns");
    setStatusFilter("All");
  };

  return (
    <>
      <Navbar />

      <main className="problems-page" role="main">
        <div className="problems-container">
          {/* Header Banner */}
          <div className="problems-header">
            <span className="page-tag">CURATED PRACTICE REPOSITORY</span>
            <h1 className="problems-page-title">Problem Catalog</h1>
            <p className="problems-page-subtitle">
              Browse 150+ coding interview problems with real test runner execution,
              algorithmic patterns, company tags, and instant Socratic AI hints.
            </p>
          </div>

          {/* Quick Difficulty Filter Bar */}
          <div className="difficulty-tabs-strip">
            <button
              type="button"
              className={`diff-tab-btn ${difficulty === "All" ? "active" : ""}`}
              onClick={() => setDifficulty("All")}
            >
              All ({problems.length})
            </button>
            <button
              type="button"
              className={`diff-tab-btn easy ${difficulty === "Easy" ? "active" : ""}`}
              onClick={() => setDifficulty("Easy")}
            >
              Easy ({problems.filter((p) => p.difficulty === "Easy").length})
            </button>
            <button
              type="button"
              className={`diff-tab-btn medium ${difficulty === "Medium" ? "active" : ""}`}
              onClick={() => setDifficulty("Medium")}
            >
              Medium ({problems.filter((p) => p.difficulty === "Medium").length})
            </button>
            <button
              type="button"
              className={`diff-tab-btn hard ${difficulty === "Hard" ? "active" : ""}`}
              onClick={() => setDifficulty("Hard")}
            >
              Hard ({problems.filter((p) => p.difficulty === "Hard").length})
            </button>
          </div>

          {/* Detailed Filters Bar */}
          <div className="problem-filters">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search problem title..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search problems"
                className="problems-search-input"
              />
              {search && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearch("")}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={topic}
              onChange={(event) => setSelectedTopic(event.target.value)}
              aria-label="Filter by Topic"
              className="filter-select"
            >
              {topics.map((item) => (
                <option value={item} key={item}>
                  {item === "All" ? "All Topics" : item}
                </option>
              ))}
            </select>

            <select
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              aria-label="Filter by Algorithmic Pattern"
              className="filter-select"
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
              className="filter-select"
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
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">✓ Solved Only</option>
              <option value="Unsolved">○ Unsolved Only</option>
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

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="active-filters-bar">
              <span className="active-filters-label">Active Filters:</span>
              {search && (
                <span className="active-filter-badge">
                  Search: &quot;{search}&quot;
                  <span className="clear-filter-x" onClick={() => setSearch("")}>×</span>
                </span>
              )}
              {topic !== "All" && (
                <span className="active-filter-badge">
                  Topic: {topic}
                  <span className="clear-filter-x" onClick={() => setSelectedTopic("All")}>×</span>
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

          {/* Problem Meta Count Strip */}
          <div className="problem-meta-bar">
            <span>
              Showing <strong>{filteredProblems.length}</strong> of {enrichedProblems.length} problems
            </span>
            <span className="solved-counter-badge">
              <strong>{solvedProblems.length}</strong> Solved
            </span>
          </div>

          {/* Problems Table */}
          <div className="problem-table-container">
            <table className="problem-table">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "42%" }}>Problem Title</th>
                  <th style={{ width: "15%" }}>Topic</th>
                  <th style={{ width: "12%" }}>Difficulty</th>
                  <th style={{ width: "12%" }}>Acceptance</th>
                  <th style={{ width: "14%", textAlign: "right" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProblems.map((problem) => {
                  const isSolved = solvedProblems.includes(problem.id);

                  return (
                    <tr key={problem.id} className={isSolved ? "row-solved" : ""}>
                      <td className="col-id">
                        {isSolved ? (
                          <span className="solved-check-icon" title="Solved">✓</span>
                        ) : (
                          <span className="unsolved-num">{problem.id}</span>
                        )}
                      </td>

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

                      <td>
                        <span className="topic-table-pill">{problem.topic}</span>
                      </td>

                      <td>
                        <span
                          className={`difficulty ${problem.difficulty.toLowerCase()}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>

                      <td>
                        <div className="acceptance-cell">
                          <span className="acceptance-text">{problem.acceptance}%</span>
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <Link
                          href={`/problems/${problem.id}/solve`}
                          className="table-solve-btn"
                          title={`Solve ${problem.title} in IDE`}
                        >
                          <span>Solve</span>
                          <span className="btn-arrow">⚡</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProblems.length === 0 && (
              <div className="no-results">
                <span className="no-results-icon">🔎</span>
                <h3>No matching problems found</h3>
                <p>Try clearing some filters or searching with a different term.</p>
                <button
                  type="button"
                  className="reset-filters-btn"
                  onClick={handleClearAllFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ProblemsPage() {
  return (
    <Suspense fallback={<div className="problems-page"><div className="loading-state">Loading problem catalog...</div></div>}>
      <ProblemsContent />
    </Suspense>
  );
}