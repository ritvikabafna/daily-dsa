"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import problems from "../data/problems";

export default function TopicsPage() {
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
        if (
          data.success &&
          data.user &&
          Array.isArray(data.user.solvedProblems)
        ) {
          setSolvedProblems((prev) => [
            ...new Set([...prev, ...data.user.solvedProblems]),
          ]);
        }
      })
      .catch((err) => console.error("Roadmap auth error:", err));

    return () => clearTimeout(timer);
  }, []);

  const topics = [...new Set(problems.map((problem) => problem.topic))];

  return (
    <>
      <Navbar />

      <main className="roadmap-page">
        <div className="roadmap-container">
          <div className="roadmap-header">
            <p className="page-tag">LEARNING PATHWAY</p>
            <h1>DSA Roadmap</h1>
            <p>
              Master data structures and algorithms systematically. Follow this
              curated roadmap topic by topic.
            </p>
          </div>

          <div className="roadmap-topics-grid">
            {topics.map((topic) => {
              const topicProblems = problems.filter(
                (problem) => problem.topic === topic
              );

              const topicSolved = topicProblems.filter((problem) =>
                solvedProblems.includes(problem.id)
              ).length;

              const topicTotal = topicProblems.length;

              const percentage =
                topicTotal === 0
                  ? 0
                  : Math.round((topicSolved / topicTotal) * 100);

              return (
                <div className="roadmap-topic-card" key={topic}>
                  <div className="roadmap-topic-top">
                    <div className="roadmap-topic-title">
                      <h2>{topic}</h2>
                      <span className="roadmap-topic-badge">
                        {topicTotal} Problems
                      </span>
                    </div>

                    <div className="roadmap-topic-stats">
                      {topicSolved} / {topicTotal} Solved ({percentage}%)
                    </div>
                  </div>

                  <div className="roadmap-progress-bar">
                    <div
                      className="roadmap-progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="roadmap-problems-list">
                    {topicProblems.map((problem) => {
                      const isSolved = solvedProblems.includes(problem.id);

                      return (
                        <Link
                          href={`/problems/${problem.id}`}
                          className="roadmap-problem-link"
                          key={problem.id}
                        >
                          <span className="problem-name">
                            <span>{isSolved ? "✅" : "○"}</span>
                            <span>{problem.title}</span>
                          </span>

                          <span
                            className={`diff-badge ${problem.difficulty.toLowerCase()}`}
                          >
                            {problem.difficulty}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
