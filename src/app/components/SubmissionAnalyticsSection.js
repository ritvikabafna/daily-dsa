"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  calculateSubmissionAnalytics,
  compareAttempts,
  groupSubmissionsByProblem,
} from "../utils/submissionAnalytics";

export default function SubmissionAnalyticsSection({
  submissions = [],
  problems = [],
}) {
  const groupedSubmissions = useMemo(
    () => groupSubmissionsByProblem(submissions),
    [submissions]
  );

  const attemptedProblemIds = useMemo(
    () => Object.keys(groupedSubmissions).map(Number),
    [groupedSubmissions]
  );

  const [selectedProblemId, setSelectedProblemId] = useState(() => {
    return attemptedProblemIds.length > 0 ? attemptedProblemIds[0] : null;
  });

  const [compareAttemptAIndex, setCompareAttemptAIndex] = useState(0);
  const [compareAttemptBIndex, setCompareAttemptBIndex] = useState(1);
  const [showCodePreviewId, setShowCodePreviewId] = useState(null);

  const currentProblem = useMemo(() => {
    return problems.find((p) => p.id === selectedProblemId) || null;
  }, [problems, selectedProblemId]);

  const currentAnalytics = useMemo(() => {
    if (!selectedProblemId || !groupedSubmissions[selectedProblemId]) {
      return null;
    }
    return calculateSubmissionAnalytics(groupedSubmissions[selectedProblemId]);
  }, [groupedSubmissions, selectedProblemId]);

  const comparison = useMemo(() => {
    if (!currentAnalytics || currentAnalytics.attempts.length < 2) return null;
    const attA = currentAnalytics.attempts[compareAttemptAIndex];
    const attB = currentAnalytics.attempts[compareAttemptBIndex];
    return compareAttempts(attA, attB);
  }, [currentAnalytics, compareAttemptAIndex, compareAttemptBIndex]);

  if (attemptedProblemIds.length === 0) {
    return (
      <div className="dashboard-card-section full-width submission-analytics-empty">
        <div className="sub-analytics-header">
          <div>
            <h3>📈 Submission Analytics &amp; Attempt Comparison</h3>
            <p className="calendar-subtitle">
              Compare attempts, track runtime improvements, and analyze verdict trends.
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "32px 16px", color: "#64748b" }}>
          <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
            No submissions recorded yet. Solve a problem to unlock attempt comparisons and runtime tracking.
          </p>
          <Link href="/problems" className="rec-solve-btn" style={{ display: "inline-block" }}>
            Explore Problems →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card-section full-width submission-analytics-card" id="submission-analytics">
      {/* Header & Problem Selector */}
      <div className="sub-analytics-header">
        <div>
          <div className="revision-header-badge" style={{ background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}>
            <span>Attempt Intelligence</span>
          </div>
          <h3 style={{ margin: "6px 0 4px 0" }}>📈 Better Submission Analytics</h3>
          <p className="calendar-subtitle" style={{ margin: 0 }}>
            Track runtime improvements, verdict trends, and compare code attempts side-by-side.
          </p>
        </div>

        <div className="sub-analytics-select-wrapper">
          <label htmlFor="problem-analytics-select" style={{ fontSize: "12px", fontWeight: "600", color: "#64748b" }}>
            Select Problem:
          </label>
          <select
            id="problem-analytics-select"
            className="sub-analytics-dropdown"
            value={selectedProblemId || ""}
            onChange={(e) => {
              const newId = Number(e.target.value);
              setSelectedProblemId(newId);
              setCompareAttemptAIndex(0);
              setCompareAttemptBIndex(1);
              setShowCodePreviewId(null);
            }}
          >
            {attemptedProblemIds.map((pId) => {
              const prob = problems.find((p) => p.id === pId);
              const count = groupedSubmissions[pId]?.length || 0;
              return (
                <option key={pId} value={pId}>
                  #{pId} {prob ? prob.title : `Problem ${pId}`} ({count} {count === 1 ? "attempt" : "attempts"})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {currentAnalytics && currentProblem && (
        <div className="sub-analytics-body">
          {/* Top Metrics Row */}
          <div className="analytics-metrics-strip">
            <div className="analytics-metric-box">
              <span className="metric-lbl">Total Attempts</span>
              <span className="metric-val">{currentAnalytics.totalAttempts}</span>
              <span className="metric-sub">
                {currentAnalytics.acceptedCount > 0 ? `✓ Accepted (${currentAnalytics.acceptanceRate}%)` : "Unsolved"}
              </span>
            </div>

            <div className="analytics-metric-box">
              <span className="metric-lbl">Best Runtime</span>
              <span className="metric-val" style={{ color: "#059669" }}>
                {currentAnalytics.bestRuntimeMs !== null ? `${currentAnalytics.bestRuntimeMs} ms` : "—"}
              </span>
              <span className="metric-sub">
                {currentAnalytics.runtimeSpeedupPercent !== null && currentAnalytics.runtimeSpeedupPercent > 0
                  ? `⚡ ${currentAnalytics.runtimeSpeedupPercent}% speedup`
                  : "Execution speed"}
              </span>
            </div>

            <div className="analytics-metric-box">
              <span className="metric-lbl">First Solved</span>
              <span className="metric-val">
                {currentAnalytics.firstAcceptedAttempt ? `Attempt #${currentAnalytics.firstAcceptedAttempt}` : "Pending"}
              </span>
              <span className="metric-sub">
                {currentAnalytics.totalAttempts - currentAnalytics.acceptedCount} setback(s)
              </span>
            </div>

            <div className="analytics-metric-box">
              <span className="metric-lbl">Overall Runtime Change</span>
              <span
                className="metric-val"
                style={{
                  color:
                    currentAnalytics.runtimeChangeOverall !== null && currentAnalytics.runtimeChangeOverall < 0
                      ? "#059669"
                      : currentAnalytics.runtimeChangeOverall !== null && currentAnalytics.runtimeChangeOverall > 0
                      ? "#d97706"
                      : "#64748b",
                }}
              >
                {currentAnalytics.runtimeChangeOverall !== null
                  ? `${currentAnalytics.runtimeChangeOverall > 0 ? "+" : ""}${currentAnalytics.runtimeChangeOverall} ms`
                  : "—"}
              </span>
              <span className="metric-sub">
                {currentAnalytics.runtimeChangeOverall !== null && currentAnalytics.runtimeChangeOverall < 0
                  ? "Faster than Attempt 1"
                  : currentAnalytics.runtimeChangeOverall !== null && currentAnalytics.runtimeChangeOverall > 0
                  ? "Slower than Attempt 1"
                  : "Single benchmark"}
              </span>
            </div>
          </div>

          {/* Verdict Progression Ribbon */}
          <div className="verdict-progression-card">
            <div className="progression-header">
              <span style={{ fontSize: "13px", fontWeight: "700" }}>Verdict &amp; Runtime Trend:</span>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Chronological Progression</span>
            </div>
            <div className="verdict-trend-flow">
              {currentAnalytics.attempts.map((att, idx) => {
                const isAccepted = att.verdict === "ACCEPTED";
                const isWrong = att.verdict === "WRONG_ANSWER";

                return (
                  <div key={att._id || idx} className="verdict-step-item">
                    <div
                      className={`verdict-step-pill ${
                        isAccepted ? "accepted" : isWrong ? "wrong" : "other"
                      }`}
                    >
                      <span className="step-num">#{att.attemptNumber}</span>
                      <span className="step-verdict">
                        {isAccepted ? "ACCEPTED" : isWrong ? "WA" : att.verdict}
                      </span>
                      {att.runtimeMs !== null && att.runtimeMs > 0 && (
                        <span className="step-speed">{att.runtimeMs}ms</span>
                      )}
                    </div>
                    {idx < currentAnalytics.attempts.length - 1 && (
                      <span className="step-arrow">➔</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Attempt Comparison Tool */}
          {currentAnalytics.attempts.length >= 2 ? (
            <div className="attempt-comparison-module">
              <div className="compare-header-row">
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}>
                  ⚖️ Compare Attempts Side-by-Side
                </h4>
                <div className="compare-selectors">
                  <div className="compare-select-group">
                    <label>Attempt A:</label>
                    <select
                      value={compareAttemptAIndex}
                      onChange={(e) => setCompareAttemptAIndex(Number(e.target.value))}
                    >
                      {currentAnalytics.attempts.map((att, idx) => (
                        <option key={idx} value={idx}>
                          Attempt #{att.attemptNumber} ({att.verdict}, {att.runtimeMs ? `${att.runtimeMs}ms` : "0ms"})
                        </option>
                      ))}
                    </select>
                  </div>

                  <span style={{ fontWeight: "800", color: "#94a3b8" }}>vs</span>

                  <div className="compare-select-group">
                    <label>Attempt B:</label>
                    <select
                      value={compareAttemptBIndex}
                      onChange={(e) => setCompareAttemptBIndex(Number(e.target.value))}
                    >
                      {currentAnalytics.attempts.map((att, idx) => (
                        <option key={idx} value={idx}>
                          Attempt #{att.attemptNumber} ({att.verdict}, {att.runtimeMs ? `${att.runtimeMs}ms` : "0ms"})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {comparison && (
                <div className="comparison-delta-card">
                  {/* Metric Deltas */}
                  <div className="comparison-delta-grid">
                    <div className="delta-stat-cell">
                      <span className="delta-lbl">Verdict Transition</span>
                      <span className="delta-val">
                        {comparison.attemptA.verdict} ➔{" "}
                        <strong
                          style={{
                            color:
                              comparison.attemptB.verdict === "ACCEPTED"
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {comparison.attemptB.verdict}
                        </strong>
                      </span>
                      {comparison.verdictImproved && (
                        <span className="delta-tag success">✓ Verdict Fixed</span>
                      )}
                      {comparison.verdictRegressed && (
                        <span className="delta-tag danger">⚠️ Regressed</span>
                      )}
                    </div>

                    <div className="delta-stat-cell">
                      <span className="delta-lbl">Test Cases Passed</span>
                      <span className="delta-val">
                        {comparison.attemptA.passed}/{comparison.attemptA.total} ➔{" "}
                        <strong>
                          {comparison.attemptB.passed}/{comparison.attemptB.total}
                        </strong>
                      </span>
                      <span
                        className={`delta-tag ${
                          comparison.passedDelta > 0
                            ? "success"
                            : comparison.passedDelta < 0
                            ? "danger"
                            : "neutral"
                        }`}
                      >
                        {comparison.passedDelta > 0 ? `+${comparison.passedDelta}` : comparison.passedDelta}{" "}
                        tests passed
                      </span>
                    </div>

                    <div className="delta-stat-cell">
                      <span className="delta-lbl">Runtime Change</span>
                      <span className="delta-val">
                        {comparison.attemptA.runtimeMs || 0}ms ➔{" "}
                        <strong>{comparison.attemptB.runtimeMs || 0}ms</strong>
                      </span>
                      {comparison.runtimeDelta !== null && (
                        <span
                          className={`delta-tag ${
                            comparison.isFaster ? "success" : comparison.runtimeDelta > 0 ? "warning" : "neutral"
                          }`}
                        >
                          {comparison.isFaster
                            ? `⚡ ${Math.abs(comparison.runtimeDelta)}ms faster (${comparison.runtimePercent}%)`
                            : comparison.runtimeDelta > 0
                            ? `↑ ${comparison.runtimeDelta}ms slower`
                            : "Same speed"}
                        </span>
                      )}
                    </div>

                    <div className="delta-stat-cell">
                      <span className="delta-lbl">Language &amp; Code Size</span>
                      <span className="delta-val">
                        {comparison.attemptA.language.toUpperCase()} ➔{" "}
                        <strong>{comparison.attemptB.language.toUpperCase()}</strong>
                      </span>
                      <span className="delta-tag neutral">
                        {comparison.linesDelta > 0 ? `+${comparison.linesDelta}` : comparison.linesDelta} lines
                      </span>
                    </div>
                  </div>

                  {/* Side-by-side Code Comparison */}
                  <div className="side-by-side-code-grid">
                    <div className="side-code-column">
                      <div className="side-code-header">
                        <span>
                          <strong>Attempt #{comparison.attemptA.attemptNumber}</strong> (
                          {comparison.attemptA.language.toUpperCase()})
                        </span>
                        <Link
                          href={`/problems/${selectedProblemId}/solve?reopen=${comparison.attemptA._id}`}
                          className="reopen-editor-btn"
                        >
                          📂 Reopen Code
                        </Link>
                      </div>
                      <pre className="side-code-pre">
                        {comparison.attemptA.code || "// No code captured for this attempt"}
                      </pre>
                    </div>

                    <div className="side-code-column">
                      <div className="side-code-header">
                        <span>
                          <strong>Attempt #{comparison.attemptB.attemptNumber}</strong> (
                          {comparison.attemptB.language.toUpperCase()})
                        </span>
                        <Link
                          href={`/problems/${selectedProblemId}/solve?reopen=${comparison.attemptB._id}`}
                          className="reopen-editor-btn"
                        >
                          📂 Reopen Code
                        </Link>
                      </div>
                      <pre className="side-code-pre">
                        {comparison.attemptB.code || "// No code captured for this attempt"}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#64748b" }}>
              💡 Submit this problem again with an alternative approach or optimization to compare attempts side-by-side.
            </div>
          )}

          {/* Attempts List with Reopen Code Buttons */}
          <div className="attempts-history-list">
            <h4 style={{ margin: "16px 0 10px 0", fontSize: "14px", fontWeight: "700" }}>
              All Attempts for Problem #{selectedProblemId}
            </h4>
            <div className="attempts-table-wrapper">
              <table className="attempts-table">
                <thead>
                  <tr>
                    <th>Attempt</th>
                    <th>Verdict</th>
                    <th>Tests Passed</th>
                    <th>Runtime &amp; Delta</th>
                    <th>Language</th>
                    <th>Date</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAnalytics.attemptsReversed.map((att) => {
                    const isLatest = att.attemptNumber === currentAnalytics.totalAttempts;
                    const isBest = att.runtimeMs !== null && att.runtimeMs === currentAnalytics.bestRuntimeMs;

                    return (
                      <tr key={att._id}>
                        <td>
                          <span style={{ fontWeight: "700" }}>#{att.attemptNumber}</span>
                          {isLatest && <span className="att-tag-pill latest">Latest</span>}
                          {isBest && <span className="att-tag-pill best">Best</span>}
                        </td>
                        <td>
                          <span
                            className={`verdict-tag ${
                              att.verdict === "ACCEPTED"
                                ? "accepted"
                                : att.verdict === "WRONG_ANSWER"
                                ? "wrong"
                                : "other"
                            }`}
                          >
                            {att.verdict}
                          </span>
                        </td>
                        <td>
                          {att.passed} / {att.total}
                        </td>
                        <td>
                          {att.runtimeMs !== null && att.runtimeMs > 0 ? (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                              <span>⚡ {att.runtimeMs} ms</span>
                              {att.runtimeDelta !== null && (
                                <span
                                  className={`runtime-delta-tag ${
                                    att.isFaster ? "faster" : att.runtimeDelta > 0 ? "slower" : "same"
                                  }`}
                                >
                                  {att.isFaster
                                    ? `↓ ${Math.abs(att.runtimeDelta)}ms`
                                    : att.runtimeDelta > 0
                                    ? `↑ ${att.runtimeDelta}ms`
                                    : "±0ms"}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className="lang-badge">{att.language.toUpperCase()}</span>
                        </td>
                        <td style={{ fontSize: "12px", color: "#64748b" }}>
                          {new Date(att.createdAt).toLocaleDateString()}{" "}
                          {new Date(att.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button
                              type="button"
                              className="view-code-inline-btn"
                              onClick={() => {
                                setShowCodePreviewId(showCodePreviewId === att._id ? null : att._id);
                              }}
                            >
                              {showCodePreviewId === att._id ? "✕ Hide" : "👁️ View"}
                            </button>
                            <Link
                              href={`/problems/${selectedProblemId}/solve?reopen=${att._id}`}
                              className="reopen-editor-btn"
                            >
                              📂 Reopen
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {showCodePreviewId && (
                <div className="inline-code-preview-box">
                  {(() => {
                    const found = currentAnalytics.attempts.find((a) => a._id === showCodePreviewId);
                    if (!found) return null;
                    return (
                      <div>
                        <div className="preview-code-header">
                          <span>
                            <strong>Attempt #{found.attemptNumber} Code</strong> ({found.language.toUpperCase()}) - {found.verdict}
                          </span>
                          <Link
                            href={`/problems/${selectedProblemId}/solve?reopen=${found._id}`}
                            className="reopen-editor-btn"
                          >
                            📂 Load in Solver Editor →
                          </Link>
                        </div>
                        <pre className="preview-code-pre">
                          {found.code || "// No code saved for this attempt"}
                        </pre>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
