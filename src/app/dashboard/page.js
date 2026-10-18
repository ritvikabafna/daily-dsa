"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import problems from "../data/problems";
import { analyzeWeakTopics } from "../utils/weakTopicAnalysis";
import SmartRevisionSection from "../components/SmartRevisionSection";
import SubmissionAnalyticsSection from "../components/SubmissionAnalyticsSection";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const localSolved = problems
        .filter(
          (problem) =>
            localStorage.getItem(`problem-${problem.id}-solved`) === "true"
        )
        .map((problem) => problem.id);

      setSolvedProblems(localSolved);

      try {
        const localSubs = JSON.parse(
          localStorage.getItem("daily_dsa_local_submissions") || "[]"
        );
        if (Array.isArray(localSubs) && localSubs.length > 0) {
          setSubmissions((prev) => (prev.length === 0 ? localSubs : prev));
        }
      } catch (e) {
        console.error("Local submissions read error:", e);
      }
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
          }

          // Fetch recent submissions up to 50 for analytics
          fetch("/api/submissions?limit=50")
            .then((res) => res.json())
            .then((subData) => {
              if (subData.success && Array.isArray(subData.submissions)) {
                try {
                  const localSubs = JSON.parse(
                    localStorage.getItem("daily_dsa_local_submissions") || "[]"
                  );
                  const merged = [...subData.submissions];
                  for (const loc of localSubs) {
                    const exists = merged.some(
                      (c) =>
                        c._id === loc._id ||
                        Math.abs(new Date(c.createdAt).getTime() - new Date(loc.createdAt).getTime()) < 3000
                    );
                    if (!exists) merged.push(loc);
                  }
                  merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                  setSubmissions(merged);
                } catch {
                  setSubmissions(subData.submissions);
                }
              }
            })
            .catch((err) => console.error("Submissions load error:", err));
        }
      })
      .catch((err) => console.error("Dashboard auth check:", err))
      .finally(() => setLoading(false));

    return () => clearTimeout(timer);
  }, []);

  const totalProblems = problems.length;
  const solvedCount = solvedProblems.length;
  const progressPercent =
    totalProblems === 0 ? 0 : Math.round((solvedCount / totalProblems) * 100);

  const easyTotal = problems.filter((p) => p.difficulty === "Easy").length;
  const easySolved = problems.filter(
    (p) => p.difficulty === "Easy" && solvedProblems.includes(p.id)
  ).length;

  const mediumTotal = problems.filter((p) => p.difficulty === "Medium").length;
  const mediumSolved = problems.filter(
    (p) => p.difficulty === "Medium" && solvedProblems.includes(p.id)
  ).length;

  const topics = [...new Set(problems.map((problem) => problem.topic))];

  // Calculate 28-day activity calendar and current streak
  const submissionCounts = {};
  submissions.forEach((sub) => {
    if (sub.createdAt) {
      const dateKey = new Date(sub.createdAt).toISOString().split("T")[0];
      submissionCounts[dateKey] = (submissionCounts[dateKey] || 0) + 1;
    }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activityCalendar = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    const count = submissionCounts[dateKey] || 0;

    activityCalendar.push({
      dateStr: dateKey,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthDay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count,
    });
  }

  let currentStreak = 0;
  let checkDate = new Date(today);
  const todayKey = checkDate.toISOString().split("T")[0];

  if ((submissionCounts[todayKey] || 0) > 0) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const key = checkDate.toISOString().split("T")[0];
    if ((submissionCounts[key] || 0) > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  if (currentStreak === 0 && solvedCount > 0) {
    currentStreak = 1;
  }

  // Personalized weak-topic analysis & difficulty-based recommendations
  const analysis = analyzeWeakTopics(submissions, problems, solvedProblems);
  const { topicStats, recommendedProblems, hasWeakTopics, totalFailures } = analysis;

  return (
    <>
      <Navbar />

      <main className="user-dashboard-page">
        <div className="user-dashboard-container">
          {/* User Profile Banner */}
          {user ? (
            <div className="user-profile-card">
              <div className="user-avatar-info">
                <div className="user-avatar-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.email} • Cloud Sync Active</p>
                </div>
              </div>

              <Link href="/problems" className="primary-btn">
                Solve Problems →
              </Link>
            </div>
          ) : (
            <div className="guest-callout">
              <div>
                <strong>You are currently browsing as a Guest.</strong>
                <p>
                  Your progress is saved locally. Log in to sync submissions and
                  progress across all your devices.
                </p>
              </div>
              <Link href="/login" className="login-btn">
                Log In
              </Link>
            </div>
          )}

          {/* Stats Grid */}
          <div className="dashboard-stats-grid">
            <div className="stat-box streak">
              <span className="stat-box-title">Daily Streak</span>
              <div className="stat-box-number">
                🔥 {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
              </div>
              <span className="stat-box-sub">
                {currentStreak > 0
                  ? "Consistency is Key!"
                  : "Solve today to start a streak!"}
              </span>
            </div>

            <div className="stat-box total">
              <span className="stat-box-title">Total Solved</span>
              <div className="stat-box-number">
                {solvedCount} / {totalProblems}
              </div>
              <span className="stat-box-sub">{progressPercent}% Completed</span>
            </div>

            <div className="stat-box easy">
              <span className="stat-box-title">Easy Problems</span>
              <div className="stat-box-number">
                {easySolved} / {easyTotal}
              </div>
              <span className="stat-box-sub">
                {easyTotal === 0
                  ? 0
                  : Math.round((easySolved / easyTotal) * 100)}
                % Solved
              </span>
            </div>

            <div className="stat-box medium">
              <span className="stat-box-title">Medium Problems</span>
              <div className="stat-box-number">
                {mediumSolved} / {mediumTotal}
              </div>
              <span className="stat-box-sub">
                {mediumTotal === 0
                  ? 0
                  : Math.round((mediumSolved / mediumTotal) * 100)}
                % Solved
              </span>
            </div>

            <div className="stat-box total">
              <span className="stat-box-title">Topics Mastered</span>
              <div className="stat-box-number">
                {
                  topics.filter((topic) => {
                    const tProbs = problems.filter((p) => p.topic === topic);
                    return (
                      tProbs.length > 0 &&
                      tProbs.every((p) => solvedProblems.includes(p.id))
                    );
                  }).length
                }{" "}
                / {topics.length}
              </div>
              <span className="stat-box-sub">Full Mastery</span>
            </div>
          </div>

          {/* Smart Revision System & Spaced Repetition */}
          <SmartRevisionSection
            solvedProblems={solvedProblems}
            submissions={submissions}
            problems={problems}
          />

          {/* Submission Analytics & Attempt Comparison */}
          <SubmissionAnalyticsSection
            submissions={submissions}
            problems={problems}
          />

          {/* Personalized Weak-Topic Analysis & Smart Recommendations */}
          <div className="analysis-dashboard-card">
            <div className="analysis-header-row">
              <div>
                <h3 className="analysis-header-title">
                  🎯 Personalized Weak-Topic Analysis & Smart Recommendations
                </h3>
                <p className="analysis-header-sub">
                  Analyzes your submission verdicts and failure patterns to recommend optimal next challenges.
                </p>
              </div>
              <div
                className={`analysis-status-badge ${
                  hasWeakTopics ? "has-weakness" : "healthy"
                }`}
              >
                {hasWeakTopics ? (
                  <>⚠️ {totalFailures} Setback{totalFailures === 1 ? "" : "s"} Detected</>
                ) : (
                  <>✨ High Accuracy Momentum</>
                )}
              </div>
            </div>

            <div className="analysis-content-grid">
              {/* Left Column: Topic Diagnostics */}
              <div>
                <h4 className="analysis-subcolumn-title">
                  📊 Topic Diagnostics & Error Patterns
                </h4>
                <div className="topic-diagnostics-list">
                  {topicStats.map((topic) => {
                    const isNeedsFocus = topic.status === "Needs Focus";
                    const isMastered = topic.status === "Mastered";
                    const isProgress = topic.status === "In Progress";

                    return (
                      <div
                        key={topic.topic}
                        className={`topic-diag-item ${isNeedsFocus ? "needs-focus" : ""}`}
                      >
                        <div className="topic-diag-header">
                          <span className="topic-diag-name">{topic.topic}</span>
                          <span
                            className={`topic-diag-pill ${
                              isNeedsFocus
                                ? "needs-focus"
                                : isMastered
                                ? "mastered"
                                : isProgress
                                ? "in-progress"
                                : "not-started"
                            }`}
                          >
                            {isNeedsFocus
                              ? `Needs Focus (${topic.wrongAttempts} Errors)`
                              : topic.status}
                          </span>
                        </div>

                        <div className="topic-diag-metrics">
                          <span>
                            Progress: <strong>{topic.solvedCount}</strong> / {topic.totalProblems} Solved ({topic.solvedPercent}%)
                          </span>
                          {topic.totalAttempts > 0 && (
                            <span className={topic.wrongAttempts > 0 ? "topic-diag-error-stat" : ""}>
                              {topic.wrongAttempts > 0
                                ? `${topic.errorRate}% Failure Rate`
                                : `${topic.accuracy}% Accuracy`}
                            </span>
                          )}
                        </div>

                        <div className="topic-diag-bar">
                          <div
                            className={`topic-diag-fill ${isNeedsFocus ? "needs-focus" : ""}`}
                            style={{
                              width: `${Math.max(5, topic.solvedPercent)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Next Recommended Problems */}
              <div>
                <h4 className="analysis-subcolumn-title">
                  💡 Recommended Next Challenges
                </h4>
                <div className="recommended-problems-list">
                  {recommendedProblems.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                      🎉 Outstanding work! You have solved all problems across all catalog topics.
                    </div>
                  ) : (
                    recommendedProblems.map((prob) => (
                      <div key={prob.id} className="recommended-prob-card">
                        <div className="rec-prob-top">
                          <span className="rec-badge-tag">{prob.badge}</span>
                          <span className={`difficulty ${prob.difficulty.toLowerCase()}`}>
                            {prob.difficulty}
                          </span>
                        </div>

                        <h5 className="rec-prob-title">{prob.title}</h5>

                        <p className="rec-prob-rationale">{prob.rationale}</p>

                        <div className="rec-prob-footer">
                          <span style={{ fontSize: "12px", color: "#64748b" }}>
                            Topic: <strong>{prob.topic}</strong>
                          </span>
                          <Link href={`/problems/${prob.id}/solve`} className="rec-solve-btn">
                            Solve Challenge →
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submission Activity Heatmap Card */}
          <div className="dashboard-card-section full-width">
            <div className="calendar-header-row">
              <div>
                <h3>Submission Activity</h3>
                <p className="calendar-subtitle">
                  Your daily problem solving momentum over the last 28 days
                </p>
              </div>
              <div className="calendar-streak-badge">
                🔥 <strong>{currentStreak} Day Streak</strong>
              </div>
            </div>

            <div className="activity-heatmap-container">
              <div className="heatmap-grid">
                {activityCalendar.map((day) => {
                  const level =
                    day.count === 0
                      ? "level-0"
                      : day.count <= 2
                      ? "level-1"
                      : day.count <= 5
                      ? "level-2"
                      : "level-3";

                  return (
                    <div
                      key={day.dateStr}
                      className={`heatmap-cell ${level}`}
                      title={`${day.monthDay}: ${day.count} ${
                        day.count === 1 ? "submission" : "submissions"
                      }`}
                    >
                      <span className="cell-date">
                        {day.monthDay.split(" ")[1]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="heatmap-legend">
                <span>Less</span>
                <span className="legend-cell level-0" />
                <span className="legend-cell level-1" />
                <span className="legend-cell level-2" />
                <span className="legend-cell level-3" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Topic Breakdown & Recent Submissions */}
          <div className="dashboard-sections-grid">
            {/* Topic Breakdown */}
            <div className="dashboard-card-section">
              <h3>Topic Progress</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {topics.map((topic) => {
                  const topicProblems = problems.filter(
                    (p) => p.topic === topic
                  );
                  const topicSolved = topicProblems.filter((p) =>
                    solvedProblems.includes(p.id)
                  ).length;
                  const percent =
                    topicProblems.length === 0
                      ? 0
                      : Math.round(
                          (topicSolved / topicProblems.length) * 100
                        );

                  return (
                    <div key={topic}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <span>{topic}</span>
                        <span style={{ color: "#64748b" }}>
                          {topicSolved} / {topicProblems.length} ({percent}%)
                        </span>
                      </div>
                      <div className="roadmap-progress-bar" style={{ marginBottom: 0 }}>
                        <div
                          className="roadmap-progress-fill"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="dashboard-card-section">
              <h3>Recent Submissions</h3>
              {loading ? (
                <p style={{ color: "#64748b", fontSize: "14px" }}>
                  Loading submission history...
                </p>
              ) : submissions.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                    {user
                      ? "No submissions recorded yet. Pick a problem and click Submit!"
                      : "Log in to record your permanent submission history."}
                  </p>
                  <Link
                    href="/problems"
                    className="solve-button"
                    style={{ display: "inline-block", marginTop: "14px" }}
                  >
                    Start Solving →
                  </Link>
                </div>
              ) : (
                <table className="dashboard-submissions-table">
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Verdict</th>
                      <th>Speed</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.slice(0, 8).map((sub) => {
                      const prob = problems.find((p) => p.id === sub.problemId);

                      return (
                        <tr key={sub._id}>
                          <td>
                            <Link
                              href={`/problems/${sub.problemId}`}
                              className="dashboard-sub-link"
                            >
                              {prob ? prob.title : `Problem #${sub.problemId}`}
                            </Link>
                          </td>
                          <td>
                            <span
                              className={`verdict-tag ${
                                sub.verdict === "ACCEPTED"
                                  ? "accepted"
                                  : sub.verdict === "WRONG_ANSWER"
                                  ? "wrong"
                                  : "other"
                              }`}
                            >
                              {sub.verdict}
                            </span>
                          </td>
                          <td>
                            {sub.runtimeMs > 0 ? (
                              <span className="sub-runtime" style={{ marginLeft: 0 }}>
                                ⚡ {sub.runtimeMs} ms
                              </span>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </td>
                          <td className="dashboard-table-date">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
