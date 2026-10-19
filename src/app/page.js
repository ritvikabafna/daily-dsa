"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import problems from "./data/problems";

export default function Home() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [user, setUser] = useState(null);

  const today = new Date();

  const dayNumber = Math.floor(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime() /
      (1000 * 60 * 60 * 24)
  );

  const todayProblem = problems[dayNumber % problems.length] || problems[0];

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
        if (data.success && data.user) {
          setUser(data.user);

          if (Array.isArray(data.user.solvedProblems)) {
            setSolvedProblems((prev) => [
              ...new Set([...prev, ...data.user.solvedProblems]),
            ]);

            data.user.solvedProblems.forEach((id) => {
              localStorage.setItem(`problem-${id}-solved`, "true");
            });
          }
        }
      })
      .catch((err) => console.error(err));

    return () => clearTimeout(timer);
  }, []);

  const totalProblems = problems.length;
  const solvedCount = solvedProblems.length;
  const remainingProblems = totalProblems - solvedCount;
  const progress =
    totalProblems === 0 ? 0 : Math.round((solvedCount / totalProblems) * 100);

  const topics = [...new Set(problems.map((problem) => problem.topic))];
  const isTodaySolved = solvedProblems.includes(todayProblem.id);

  return (
    <>
      <Navbar />

      <Hero />

      {/* Progress & Daily Challenge Section */}
      <section className="dashboard-section" aria-label="Daily Practice & Progress">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <span className="page-tag">PRACTICE OVERVIEW</span>
            <h2 className="dashboard-heading">
              Track Your <span className="text-gradient">Daily Mastery</span>
            </h2>
            <p className="dashboard-subtext">
              Consistency beats intensity. Solve at least one problem every day to stay interview-ready.
            </p>
          </div>

          {/* 4 Quick Stat Cards */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="card-top-row">
                <span className="card-lbl">Total Problems</span>
                <span className="card-icon-badge blue">📚</span>
              </div>
              <strong className="card-val">{totalProblems}</strong>
              <span className="card-hint">Curated curriculum</span>
            </div>

            <div className="dashboard-card">
              <div className="card-top-row">
                <span className="card-lbl">Solved</span>
                <span className="card-icon-badge emerald">✓</span>
              </div>
              <strong className="card-val">{solvedCount}</strong>
              <span className="card-hint">Verified completions</span>
            </div>

            <div className="dashboard-card">
              <div className="card-top-row">
                <span className="card-lbl">Remaining</span>
                <span className="card-icon-badge amber">⏳</span>
              </div>
              <strong className="card-val">{remainingProblems}</strong>
              <span className="card-hint">In queue</span>
            </div>

            <div className="dashboard-card">
              <div className="card-top-row">
                <span className="card-lbl">Completion</span>
                <span className="card-icon-badge violet">🚀</span>
              </div>
              <strong className="card-val">{progress}%</strong>
              <span className="card-hint">Overall rate</span>
            </div>
          </div>

          {/* Progress Bar Module */}
          <div className="progress-container">
            <div className="progress-header">
              <div className="progress-title-wrap">
                <span className="progress-label-main">Curriculum Progress</span>
                <span className="progress-label-sub">
                  {solvedCount} of {totalProblems} problems mastered
                </span>
              </div>
              <span className="progress-percent-badge">{progress}%</span>
            </div>

            <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Today's Challenge Feature Card */}
          <div className="daily-challenge-banner">
            <div className="daily-challenge-left">
              <div className="daily-challenge-meta">
                <span className="daily-badge">⚡ TODAY&apos;S CHALLENGE</span>
                <span
                  className={`difficulty ${todayProblem.difficulty.toLowerCase()}`}
                >
                  {todayProblem.difficulty}
                </span>
                <span className="topic-pill">{todayProblem.topic}</span>
                {isTodaySolved && (
                  <span className="solved-today-badge">✓ Solved</span>
                )}
              </div>

              <h3 className="daily-challenge-title">{todayProblem.title}</h3>

              <p className="daily-challenge-desc">
                {todayProblem.description}
              </p>

              <div className="daily-challenge-tags">
                {todayProblem.tags?.map((tag) => (
                  <span className="challenge-tag-chip" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="daily-challenge-right">
              <Link
                href={`/problems/${todayProblem.id}/solve`}
                className="solve-daily-btn"
              >
                <span>{isTodaySolved ? "Practice Again" : "Solve Challenge"}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link
                href={`/problems/${todayProblem.id}`}
                className="view-details-link"
              >
                View Problem Statement ↗
              </Link>
            </div>
          </div>

          {/* Topic Progress Grid */}
          <div className="topic-progress-section">
            <div className="topic-progress-header">
              <div>
                <span className="page-tag">ROADMAP BREAKDOWN</span>
                <h3 className="topic-section-title">Topic-wise Progress</h3>
              </div>
              <Link href="/topics" className="view-all-topics-link">
                View Full Roadmap →
              </Link>
            </div>

            <div className="topic-progress-grid">
              {topics.map((topic) => {
                const topicProblems = problems.filter(
                  (problem) => problem.topic === topic
                );

                const topicSolved = topicProblems.filter((problem) =>
                  solvedProblems.includes(problem.id)
                ).length;

                const topicTotal = topicProblems.length;

                const topicPercentage =
                  topicTotal === 0
                    ? 0
                    : Math.round((topicSolved / topicTotal) * 100);

                return (
                  <Link
                    href={`/problems?topic=${encodeURIComponent(topic)}`}
                    className="topic-card"
                    key={topic}
                  >
                    <div className="topic-card-header">
                      <strong className="topic-name">{topic}</strong>
                      <span className="topic-counts">
                        {topicSolved}/{topicTotal}
                      </span>
                    </div>

                    <div className="topic-progress-bar">
                      <div
                        className="topic-progress-fill"
                        style={{
                          width: `${topicPercentage}%`,
                        }}
                      />
                    </div>

                    <div className="topic-card-footer">
                      <span className="topic-percent-text">
                        {topicPercentage}% mastered
                      </span>
                      <span className="topic-browse-arrow">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Features />

      <Stats />

      <Footer />
    </>
  );
}