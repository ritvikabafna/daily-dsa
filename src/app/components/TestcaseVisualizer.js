"use client";

import { useState } from "react";
import { computeTokenDiff } from "../../utils/diffViewer";

export default function TestcaseVisualizer({
  testCases = [],
  results = null,
  verdict = null,
  runtimeMs = null,
  onAskAiFailure = null,
}) {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [showDiffHighlight, setShowDiffHighlight] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const currentResult = results ? results[selectedCaseIndex] : null;
  const currentTestCase = testCases[selectedCaseIndex] || testCases[0] || {};

  const inputDisplay = currentResult?.input ?? currentTestCase.input ?? "";
  const expectedDisplay = currentResult?.expectedOutput ?? currentTestCase.output ?? "";
  const actualDisplay = currentResult?.actualOutput ?? "";
  const errorDisplay = currentResult?.error ?? null;
  const isPassed = currentResult ? currentResult.passed : null;

  const diff = computeTokenDiff(expectedDisplay, actualDisplay);

  return (
    <div className="leetcode-testcase-container">
      {/* Case Tabs Bar */}
      <div className="testcase-tabs-bar">
        <div className="testcase-tab-pills">
          {testCases.map((tc, idx) => {
            const res = results ? results[idx] : null;
            let statusClass = "";
            let dot = null;

            if (res) {
              if (res.passed) {
                statusClass = "case-passed";
                dot = <span className="case-dot green" title="Passed">●</span>;
              } else {
                statusClass = "case-failed";
                dot = <span className="case-dot red" title="Failed">●</span>;
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className={`testcase-pill-btn ${selectedCaseIndex === idx ? "active" : ""} ${statusClass}`}
                onClick={() => setSelectedCaseIndex(idx)}
              >
                {dot}
                <span>Case {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {results && (
          <div className="testcase-toolbar-right">
            <button
              type="button"
              className={`diff-toggle-btn ${showDiffHighlight ? "active" : ""}`}
              onClick={() => setShowDiffHighlight(!showDiffHighlight)}
              title="Toggle token-level diff comparison"
            >
              {showDiffHighlight ? "🔍 Visual Diff: ON" : "📄 Raw Output"}
            </button>
          </div>
        )}
      </div>

      {/* Main Test Details Card */}
      <div className="testcase-detail-card">
        {/* Case Header Status if Run has occurred */}
        {currentResult && (
          <div className={`case-status-banner ${isPassed ? "banner-pass" : "banner-fail"}`}>
            <div className="banner-left">
              <span className="banner-icon">{isPassed ? "✓" : "✗"}</span>
              <strong className="banner-title">
                {isPassed ? "Accepted on Case " + (selectedCaseIndex + 1) : "Wrong Answer on Case " + (selectedCaseIndex + 1)}
              </strong>
              {currentResult.runtimeMs > 0 && (
                <span className="case-runtime-pill">⚡ {currentResult.runtimeMs} ms</span>
              )}
            </div>

            {!isPassed && onAskAiFailure && (
              <button
                type="button"
                className="banner-ai-action-btn"
                onClick={() => onAskAiFailure(currentResult)}
              >
                ✨ Explain This Case with AI
              </button>
            )}
          </div>
        )}

        {/* Input Block */}
        <div className="tc-field-group">
          <div className="tc-field-header">
            <span className="tc-field-label">Input</span>
            <button
              type="button"
              className="tc-copy-btn"
              onClick={() => copyToClipboard(inputDisplay, "input")}
            >
              {copiedField === "input" ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <div className="tc-code-box">
            <pre>{inputDisplay || "(Empty input)"}</pre>
          </div>
        </div>

        {/* Output Block (When executed) */}
        {results ? (
          <>
            <div className="tc-field-group">
              <div className="tc-field-header">
                <span className="tc-field-label">
                  Your Output{" "}
                  {currentResult && (
                    <span className={isPassed ? "tc-tag pass" : "tc-tag fail"}>
                      {isPassed ? "Match" : "Mismatch"}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  className="tc-copy-btn"
                  onClick={() => copyToClipboard(actualDisplay, "actual")}
                >
                  {copiedField === "actual" ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <div className={`tc-code-box ${!isPassed ? "diff-actual-box" : ""}`}>
                {showDiffHighlight && !isPassed && diff.actualTokens.length > 0 ? (
                  <div className="diff-token-display">
                    {diff.actualTokens.map((tok, i) => (
                      <span
                        key={i}
                        className={`diff-tok ${tok.status === "match" ? "tok-match" : "tok-err"}`}
                      >
                        {tok.text}{" "}
                      </span>
                    ))}
                  </div>
                ) : (
                  <pre>{actualDisplay || "(No standard output)"}</pre>
                )}
              </div>
            </div>

            {/* Expected Output Block */}
            <div className="tc-field-group">
              <div className="tc-field-header">
                <span className="tc-field-label">Expected Output</span>
                <button
                  type="button"
                  className="tc-copy-btn"
                  onClick={() => copyToClipboard(expectedDisplay, "expected")}
                >
                  {copiedField === "expected" ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <div className={`tc-code-box ${!isPassed ? "diff-expected-box" : ""}`}>
                {showDiffHighlight && !isPassed && diff.expectedTokens.length > 0 ? (
                  <div className="diff-token-display">
                    {diff.expectedTokens.map((tok, i) => (
                      <span
                        key={i}
                        className={`diff-tok ${tok.status === "match" ? "tok-match" : "tok-exp"}`}
                      >
                        {tok.text}{" "}
                      </span>
                    ))}
                  </div>
                ) : (
                  <pre>{expectedDisplay || "(Empty expected output)"}</pre>
                )}
              </div>
            </div>

            {/* Error Block if any */}
            {errorDisplay && (
              <div className="tc-field-group error-group">
                <div className="tc-field-header">
                  <span className="tc-field-label error-label">Runtime / Execution Diagnostics</span>
                </div>
                <div className="tc-code-box error-box">
                  <pre>{errorDisplay}</pre>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Idle state before execution */
          <div className="tc-field-group">
            <div className="tc-field-header">
              <span className="tc-field-label">Expected Output</span>
              <button
                type="button"
                className="tc-copy-btn"
                onClick={() => copyToClipboard(expectedDisplay, "expected")}
              >
                {copiedField === "expected" ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="tc-code-box">
              <pre>{expectedDisplay || "(Empty expected output)"}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
