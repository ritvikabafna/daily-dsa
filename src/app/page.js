"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import problems from "./data/problems";

export default function Home() {
  const [solvedProblems, setSolvedProblems] = useState([]);

  const today = new Date();

  const dayNumber = Math.floor(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime() /
      (1000 * 60 * 60 * 24)
  );

  const todayProblem =
    problems[dayNumber % problems.length];

  useEffect(() => {
    const solved = problems
      .filter(
        (problem) =>
          localStorage.getItem(
            `problem-${problem.id}-solved`
          ) === "true"
      )
      .map((problem) => problem.id);

    setSolvedProblems(solved);
  }, []);

  const totalProblems = problems.length;

  const solvedCount = solvedProblems.length;

  const remainingProblems =
    totalProblems - solvedCount;

  const progress =
    totalProblems === 0
      ? 0
      : Math.round(
          (solvedCount / totalProblems) * 100
        );

  const topics = [...new Set(
    problems.map((problem) => problem.topic)
  )];

  return (
    <>
      <Navbar />

      <Hero />

      <section className="dashboard-section">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <p className="page-tag">
              YOUR PROGRESS
            </p>

            <h2>Keep improving your DSA</h2>

            <p>
              Track your progress and keep solving
              problems every day.
            </p>
          </div>

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <span>Total Problems</span>
              <strong>{totalProblems}</strong>
            </div>

            <div className="dashboard-card">
              <span>Solved</span>
              <strong>{solvedCount}</strong>
            </div>

            <div className="dashboard-card">
              <span>Remaining</span>
              <strong>{remainingProblems}</strong>
            </div>

            <div className="dashboard-card">
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>

          </div>

          <div className="progress-container">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="daily-challenge">

            <div className="daily-challenge-header">
              <p className="page-tag">
                TODAY'S CHALLENGE
              </p>

              <span
                className={`difficulty ${todayProblem.difficulty.toLowerCase()}`}
              >
                {todayProblem.difficulty}
              </span>
            </div>

            <h3>{todayProblem.title}</h3>

            <p>
              {todayProblem.description}
            </p>

            <a
              href={`/problems/${todayProblem.id}`}
              className="solve-button"
            >
              Solve Challenge →
            </a>

          </div>

          <div className="topic-progress">

            <div className="dashboard-header">
              <p className="page-tag">
                TOPIC PROGRESS
              </p>

              <h2>Track your progress by topic</h2>
            </div>

            <div className="topic-progress-grid">

              {topics.map((topic) => {
                const topicProblems =
                  problems.filter(
                    (problem) =>
                      problem.topic === topic
                  );

                const topicSolved =
                  topicProblems.filter(
                    (problem) =>
                      solvedProblems.includes(
                        problem.id
                      )
                  ).length;

                const topicTotal =
                  topicProblems.length;

                const topicPercentage =
                  topicTotal === 0
                    ? 0
                    : Math.round(
                        (topicSolved /
                          topicTotal) *
                          100
                      );

                return (
                  <div
                    className="topic-card"
                    key={topic}
                  >
                    <div className="topic-card-header">
                      <strong>{topic}</strong>

                      <span>
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

                    <p>
                      {topicPercentage}% completed
                    </p>
                  </div>
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