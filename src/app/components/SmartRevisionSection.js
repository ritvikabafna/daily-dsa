"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateRevisionSchedule,
  recordRevisionCompletion,
  DEFAULT_INTERVALS,
} from "../utils/revisionSystem";

export default function SmartRevisionSection({
  solvedProblems = [],
  submissions = [],
  problems = [],
  onRevisionUpdated,
}) {
  const [activeTab, setActiveTab] = useState("due");
  const [justRevisedId, setJustRevisedId] = useState(null);
  const [customRatingId, setCustomRatingId] = useState(null);

  // Read stored schedule from localStorage if available
  const existingSchedule = (() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("daily_dsa_revision_schedule");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();

  const revisionData = calculateRevisionSchedule({
    solvedProblemIds: solvedProblems,
    submissions,
    problems,
    existingSchedule,
  });

  const { dueList, upcomingList, completedList, stats } = revisionData;

  const handleQuickComplete = (problemId, rating = "medium") => {
    const updated = recordRevisionCompletion({
      existingSchedule: revisionData.schedule,
      problemId,
      rating,
      revisionDate: new Date(),
    });

    try {
      localStorage.setItem(
        "daily_dsa_revision_schedule",
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error("Failed to persist revision schedule:", e);
    }

    setJustRevisedId(problemId);
    setCustomRatingId(null);
    setTimeout(() => setJustRevisedId(null), 3000);

    if (onRevisionUpdated) {
      onRevisionUpdated(updated);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "Never";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  return (
    <section className="revision-system-card" id="smart-revision">
      {/* Header */}
      <div className="revision-header-row">
        <div className="revision-header-left">
          <div className="revision-header-badge">
            <span className="revision-pulse-dot"></span>
            <span>Spaced Repetition</span>
          </div>
          <h3 className="revision-title">🔄 Smart Revision System</h3>
          <p className="revision-subtitle">
            Targeted retention intervals for solved problems, prioritizing those
            with repeated mistakes or high cognitive load.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="revision-metrics-bar">
          <div className="revision-metric-item highlight">
            <span className="metric-val">{stats.dueCount}</span>
            <span className="metric-lbl">Due Now</span>
          </div>
          <div className="revision-metric-item">
            <span className="metric-val">{stats.upcomingCount}</span>
            <span className="metric-lbl">Upcoming</span>
          </div>
          <div className="revision-metric-item">
            <span className="metric-val">{stats.completedRevisionsCount}</span>
            <span className="metric-lbl">Revisions Logged</span>
          </div>
          <div className="revision-metric-item">
            <span className="metric-val">{stats.totalTracked}</span>
            <span className="metric-lbl">In Rotation</span>
          </div>
        </div>
      </div>

      {/* Interval Strategy Cards */}
      <div className="revision-intervals-grid">
        <div className="interval-card difficult">
          <div className="interval-card-header">
            <span className="interval-pill difficult">🔴 Difficult</span>
            <span className="interval-days">{DEFAULT_INTERVALS.difficult} Days</span>
          </div>
          <p className="interval-desc">
            Triggered automatically when 2+ failed attempts or repeated mistakes
            occur before solving. Re-tests core tricky insights quickly.
          </p>
        </div>

        <div className="interval-card medium">
          <div className="interval-card-header">
            <span className="interval-pill medium">🟡 Medium</span>
            <span className="interval-days">{DEFAULT_INTERVALS.medium} Days</span>
          </div>
          <p className="interval-desc">
            Standard review interval for normal difficulty problems. Solidifies
            pattern recognition and data structure paradigms.
          </p>
        </div>

        <div className="interval-card easy">
          <div className="interval-card-header">
            <span className="interval-pill easy">🟢 Easy</span>
            <span className="interval-days">{DEFAULT_INTERVALS.easy} Days</span>
          </div>
          <p className="interval-desc">
            Extended spacing for problems solved cleanly on the first try.
            Maintains long-term algorithmic recall without fatigue.
          </p>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="revision-tabs-bar">
        <button
          type="button"
          className={`revision-tab-btn ${activeTab === "due" ? "active" : ""}`}
          onClick={() => setActiveTab("due")}
        >
          <span>⏰ Due for Revision</span>
          {stats.dueCount > 0 && (
            <span className="revision-tab-counter">{stats.dueCount}</span>
          )}
        </button>

        <button
          type="button"
          className={`revision-tab-btn ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          <span>📅 Upcoming Schedule</span>
          <span className="revision-tab-counter muted">
            {stats.upcomingCount}
          </span>
        </button>

        <button
          type="button"
          className={`revision-tab-btn ${
            activeTab === "completed" ? "active" : ""
          }`}
          onClick={() => setActiveTab("completed")}
        >
          <span>✅ Completed History</span>
          <span className="revision-tab-counter muted">
            {completedList.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Due For Revision */}
      {activeTab === "due" && (
        <div className="revision-tab-content">
          {dueList.length === 0 ? (
            <div className="revision-empty-state">
              <div className="empty-icon">🎉</div>
              <h4>All Caught Up!</h4>
              <p>
                {solvedProblems.length === 0
                  ? "Solve your first problem to start your spaced repetition schedule."
                  : "None of your solved problems are due for revision right now. Great job keeping your retention sharp!"}
              </p>
              {solvedProblems.length === 0 && (
                <Link href="/problems" className="revision-empty-btn">
                  Browse Problems →
                </Link>
              )}
            </div>
          ) : (
            <div className="revision-problems-list">
              {dueList.map((item) => (
                <div
                  key={item.problemId}
                  className={`revision-item-card ${
                    item.status === "overdue" ? "overdue" : ""
                  }`}
                >
                  <div className="revision-item-main">
                    <div className="revision-item-badges">
                      <span className="topic-badge">{item.topic}</span>
                      <span
                        className={`diff-badge ${item.difficulty.toLowerCase()}`}
                      >
                        {item.difficulty}
                      </span>
                      {item.status === "overdue" ? (
                        <span className="status-badge overdue">
                          ⚠️ Overdue by {item.daysOverdue}{" "}
                          {item.daysOverdue === 1 ? "day" : "days"}
                        </span>
                      ) : (
                        <span className="status-badge due-today">
                          ⏰ Due Today
                        </span>
                      )}
                      {item.struggled && (
                        <span className="struggle-badge">
                          💥 {item.failureCount} Past Failures
                        </span>
                      )}
                    </div>

                    <h4 className="revision-item-title">
                      <Link href={`/problems/${item.problemId}/solve?revision=true`}>
                        {item.problemId}. {item.title}
                      </Link>
                    </h4>

                    <div className="revision-item-meta">
                      <span>
                        First Solved: {formatDate(item.firstSolvedDate)}
                      </span>
                      <span>•</span>
                      <span>
                        Last Revised: {formatDate(item.lastRevisedDate)}
                      </span>
                      <span>•</span>
                      <span>Revisions Logged: {item.revisionCount}</span>
                      <span>•</span>
                      <span>
                        Current Interval: {item.currentIntervalDays}d
                      </span>
                    </div>
                  </div>

                  <div className="revision-item-actions">
                    <Link
                      href={`/problems/${item.problemId}/solve?revision=true`}
                      className="revision-solve-btn"
                    >
                      Revise Problem →
                    </Link>

                    {customRatingId === item.problemId ? (
                      <div className="revision-rating-dropdown">
                        <span className="rating-prompt">Recall difficulty:</span>
                        <div className="rating-buttons">
                          <button
                            type="button"
                            className="rating-btn hard"
                            title="Challenging (+2 days)"
                            onClick={() =>
                              handleQuickComplete(item.problemId, "difficult")
                            }
                          >
                            Hard (+2d)
                          </button>
                          <button
                            type="button"
                            className="rating-btn medium"
                            title="Good recall (+5 days)"
                            onClick={() =>
                              handleQuickComplete(item.problemId, "medium")
                            }
                          >
                            Good (+5d)
                          </button>
                          <button
                            type="button"
                            className="rating-btn easy"
                            title="Effortless recall (+14 days)"
                            onClick={() =>
                              handleQuickComplete(item.problemId, "easy")
                            }
                          >
                            Easy (+14d)
                          </button>
                          <button
                            type="button"
                            className="rating-btn cancel"
                            onClick={() => setCustomRatingId(null)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="mark-revised-btn"
                        onClick={() => setCustomRatingId(item.problemId)}
                      >
                        ✓ Mark Revised
                      </button>
                    )}

                    {justRevisedId === item.problemId && (
                      <div className="revision-toast">✓ Revision Logged!</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Upcoming Schedule */}
      {activeTab === "upcoming" && (
        <div className="revision-tab-content">
          {upcomingList.length === 0 ? (
            <div className="revision-empty-state">
              <div className="empty-icon">📅</div>
              <h4>No Upcoming Revisions</h4>
              <p>
                As you solve problems or complete revisions, upcoming dates will
                appear here automatically.
              </p>
            </div>
          ) : (
            <div className="revision-problems-list">
              {upcomingList.map((item) => (
                <div key={item.problemId} className="revision-item-card upcoming">
                  <div className="revision-item-main">
                    <div className="revision-item-badges">
                      <span className="topic-badge">{item.topic}</span>
                      <span
                        className={`diff-badge ${item.difficulty.toLowerCase()}`}
                      >
                        {item.difficulty}
                      </span>
                      <span className="status-badge upcoming">
                        ⏳ Due in {item.daysUntilDue}{" "}
                        {item.daysUntilDue === 1 ? "day" : "days"} (
                        {formatDate(item.nextDueDate)})
                      </span>
                      {item.struggled && (
                        <span className="struggle-badge subtle">
                          Struggled in Past
                        </span>
                      )}
                    </div>

                    <h4 className="revision-item-title">
                      <Link href={`/problems/${item.problemId}/solve?revision=true`}>
                        {item.problemId}. {item.title}
                      </Link>
                    </h4>

                    <div className="revision-item-meta">
                      <span>Interval: {item.currentIntervalDays} days</span>
                      <span>•</span>
                      <span>Revisions: {item.revisionCount}</span>
                      <span>•</span>
                      <span>
                        Last Revised: {formatDate(item.lastRevisedDate)}
                      </span>
                    </div>
                  </div>

                  <div className="revision-item-actions">
                    <Link
                      href={`/problems/${item.problemId}/solve?revision=true`}
                      className="revision-early-btn"
                    >
                      Revise Early →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Completed History */}
      {activeTab === "completed" && (
        <div className="revision-tab-content">
          {completedList.length === 0 ? (
            <div className="revision-empty-state">
              <div className="empty-icon">📖</div>
              <h4>No Completed Revisions Yet</h4>
              <p>
                When you revise due problems and log your recall difficulty,
                your full revision progression history will show up here.
              </p>
            </div>
          ) : (
            <div className="revision-problems-list">
              {completedList.map((item) => (
                <div key={item.problemId} className="revision-item-card completed">
                  <div className="revision-item-main">
                    <div className="revision-item-badges">
                      <span className="topic-badge">{item.topic}</span>
                      <span
                        className={`diff-badge ${item.difficulty.toLowerCase()}`}
                      >
                        {item.difficulty}
                      </span>
                      <span className="status-badge completed">
                        ✓ {item.revisionCount}{" "}
                        {item.revisionCount === 1 ? "Revision" : "Revisions"}
                      </span>
                      <span className="interval-chip">
                        Next: {item.currentIntervalDays}d interval
                      </span>
                    </div>

                    <h4 className="revision-item-title">
                      <Link href={`/problems/${item.problemId}/solve`}>
                        {item.problemId}. {item.title}
                      </Link>
                    </h4>

                    <div className="revision-item-meta">
                      <span>
                        Last Revised: {formatDate(item.lastRevisedDate)}
                      </span>
                      <span>•</span>
                      <span>Next Due: {formatDate(item.nextDueDate)}</span>
                    </div>

                    {item.history && item.history.length > 0 && (
                      <div className="revision-history-pills">
                        <span className="history-label">Past sessions:</span>
                        {item.history.slice(-3).map((h, i) => (
                          <span
                            key={i}
                            className={`history-pill ${h.rating}`}
                            title={`Session ${h.revisionNumber}: ${h.rating} (+${h.intervalDays}d)`}
                          >
                            #{h.revisionNumber} {h.rating} (+{h.intervalDays}d)
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="revision-item-actions">
                    <Link
                      href={`/problems/${item.problemId}/solve?revision=true`}
                      className="revision-solve-btn secondary"
                    >
                      Practice Again →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
