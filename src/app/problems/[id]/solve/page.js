"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import problems from "../../../data/problems";
import { getEditorial } from "../../../data/editorials";
import CodeEditor from "../../../components/CodeEditor";

const STARTER_TEMPLATES = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Read input and print solution
    
    return 0;
}`,
  python: `import sys

def main():
    # Read all inputs from standard input
    input_data = sys.stdin.read().split()
    if not input_data:
        return

    # Solve the problem and print output
    pass

if __name__ == "__main__":
    main()`,
};

export default function SolvePage() {
  const params = useParams();
  const router = useRouter();

  const problem = problems.find(
    (item) => item.id === Number(params.id)
  );

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("testcases");
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [savedToCloud, setSavedToCloud] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showEditorial, setShowEditorial] = useState(false);
  const [approachIndex, setApproachIndex] = useState(0);
  const [editorialLang, setEditorialLang] = useState("cpp");
  const [editorialCopied, setEditorialCopied] = useState(false);
  const [expandedTests, setExpandedTests] = useState({});
  const [theme, setTheme] = useState("vs-dark");
  const [copied, setCopied] = useState(false);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInputText, setCustomInputText] = useState(
    problem?.testCases?.[0]?.input || ""
  );

  const problemId = problem ? problem.id : null;
  const editorial = getEditorial(problem);

  const currentApproach =
    editorial?.approaches && editorial.approaches[approachIndex]
      ? editorial.approaches[approachIndex]
      : editorial;

  const activeEditorialCode =
    editorialLang === "python"
      ? currentApproach?.python || editorial?.python || ""
      : currentApproach?.cpp || editorial?.cpp || "";

  const handleInsertSolution = (solutionCode, targetLang) => {
    if (confirm("Insert canonical reference solution into code editor?")) {
      setLanguage(targetLang);
      setCode(solutionCode);
      if (problemId) {
        localStorage.setItem(`problem-${problemId}-${targetLang}-code`, solutionCode);
      }
    }
  };

  const handleCopyEditorial = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setEditorialCopied(true);
      setTimeout(() => setEditorialCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy editorial code:", err);
    }
  };

  const handleResetCode = () => {
    if (confirm("Reset code back to original starter template?")) {
      const template = STARTER_TEMPLATES[language] || "";
      setCode(template);
      if (problemId) {
        localStorage.setItem(`problem-${problemId}-${language}-code`, template);
      }
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  useEffect(() => {
    if (!problemId) return;

    const timer = setTimeout(() => {
      setApproachIndex(0);
      const savedLangCode = localStorage.getItem(`problem-${problemId}-${language}-code`);
      const legacyCode = localStorage.getItem(`problem-${problemId}-code`);

      if (savedLangCode !== null) {
        setCode(savedLangCode);
      } else if (language === "cpp" && legacyCode !== null) {
        setCode(legacyCode);
      } else {
        setCode(STARTER_TEMPLATES[language] || "");
      }
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  const handleLanguageChange = (newLanguage) => {
    if (problemId && code !== "") {
      localStorage.setItem(`problem-${problemId}-${language}-code`, code);
    }
    setLanguage(newLanguage);
    const saved = localStorage.getItem(`problem-${problemId}-${newLanguage}-code`);
    if (saved !== null) {
      setCode(saved);
    } else if (newLanguage === "cpp") {
      const legacy = localStorage.getItem(`problem-${problemId}-code`);
      setCode(legacy !== null ? legacy : STARTER_TEMPLATES.cpp);
    } else {
      setCode(STARTER_TEMPLATES[newLanguage] || "");
    }
  };

  useEffect(() => {
    if (problemId && code !== "") {
      localStorage.setItem(`problem-${problemId}-${language}-code`, code);
      if (language === "cpp") {
        localStorage.setItem(`problem-${problemId}-code`, code);
      }
    }
  }, [problemId, language, code]);

  const fetchSubmissions = async () => {
    if (!problem) return;
    setLoadingSubmissions(true);
    try {
      const res = await fetch(`/api/submissions?problemId=${problem.id}`);
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error("Submissions load error:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleRun = async (isSubmit = false) => {
    if (running) return;

    const shouldSubmit = isSubmit === true;

    setRunning(true);
    setSavedToCloud(false);
    setActiveTab("testcases");

    setOutput({
      loading: true,
    });

    try {
      const payload = {
        code,
        language,
        problemId: problem.id,
        isSubmit: shouldSubmit,
      };

      if (!shouldSubmit && useCustomInput) {
        payload.customInput = customInputText;
      }

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Execution API response:", data);

      if (!response.ok || !data.success) {
        setOutput({
          error: data.error || "Unknown execution error.",
        });
        return;
      }

      setOutput(data.result);

      if (data.savedToCloud) {
        setSavedToCloud(true);
        fetchSubmissions();
      }

      if (data.result.verdict === "ACCEPTED" && !data.result.isCustom) {
        localStorage.setItem(
          `problem-${problem.id}-solved`,
          "true"
        );
      }
    } catch (error) {
      console.error("Frontend execution error:", error);

      setOutput({
        error: "Could not connect to execution server.",
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    await handleRun(true);
  };

  return (
    <main className="solve-page">

      <div className="solve-header">
        <Link href={`/problems/${problem.id}`}>
          ← Back to Problem
        </Link>

        <h1>{problem.title}</h1>

        <span
          className={`difficulty ${problem.difficulty.toLowerCase()}`}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="solve-workspace">

        {/* LEFT SIDE */}

        <section className="problem-panel">

          <p className="problem-topic">
            {problem.topic}
          </p>

          <h2>{problem.title}</h2>

          <h3>Description</h3>

          <p>{problem.description}</p>

          <h3>Examples</h3>

          {problem.examples.map((example, index) => (
            <div
              className="solve-example"
              key={index}
            >
              <strong>
                Example {index + 1}
              </strong>

              <p>
                Input: {example.input}
              </p>

              <p>
                Output: {example.output}
              </p>
            </div>
          ))}

          <h3>Constraints</h3>

          <ul>
            {problem.constraints.map(
              (constraint, index) => (
                <li key={index}>
                  {constraint}
                </li>
              )
            )}
          </ul>

          {problem.tags && problem.tags.length > 0 && (
            <div className="problem-tags-container">
              <h3>Topics & Tags</h3>
              <div className="problem-tags-list">
                {problem.tags.map((tag, idx) => (
                  <span className="problem-tag-pill" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="problem-hints-section">
            <button
              type="button"
              className="hints-toggle-btn"
              onClick={() => setShowHints((prev) => !prev)}
            >
              <span>💡 Hints & Algorithmic Strategy</span>
              <span>{showHints ? "▲ Hide" : "▼ Show"}</span>
            </button>

            {showHints && (
              <div className="hints-content-box">
                <div className="hint-item">
                  <strong>Hint 1: Data Structure Choice</strong>
                  <p>
                    {problem.tags?.includes("Hash Table")
                      ? "A Hash Table provides O(1) average lookup. Can you store seen values or complements as you traverse?"
                      : problem.tags?.includes("Two Pointers")
                      ? "Consider using two pointers from opposite ends or sliding a window to avoid nested iterations."
                      : problem.tags?.includes("Linked List")
                      ? "Trace pointer references carefully. A dummy head node often simplifies edge cases like removing nodes."
                      : "Consider breaking down the brute-force approach first, then identify repeated sub-computations."}
                  </p>
                </div>

                <div className="hint-item">
                  <strong>Hint 2: Complexity Target</strong>
                  <p>
                    Aim for <code>O(N)</code> or <code>O(N log N)</code> time complexity. Avoid nested loops (<code>O(N²)</code>) which may cause Time Limit Exceeded on larger inputs.
                  </p>
                </div>
              </div>
            )}
          </div>

          {editorial && (
            <div className="problem-editorial-section">
              <button
                type="button"
                className="editorial-toggle-btn"
                onClick={() => setShowEditorial((prev) => !prev)}
              >
                <span>📘 Canonical Solution &amp; Editorial</span>
                <span>{showEditorial ? "▲ Hide" : "▼ Show"}</span>
              </button>

              {showEditorial && (
                <div className="editorial-content-box">
                  {editorial.approaches && editorial.approaches.length > 1 && (
                    <div className="approach-tabs-row">
                      {editorial.approaches.map((app, idx) => (
                        <button
                          key={app.id || idx}
                          type="button"
                          className={`approach-tab-btn ${
                            approachIndex === idx ? "active" : ""
                          }`}
                          onClick={() => setApproachIndex(idx)}
                        >
                          {app.name || `Approach ${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="editorial-complexity-row">
                    <span className="complexity-chip time">
                      ⏱ Time: {currentApproach?.timeComplexity || editorial.timeComplexity}
                    </span>
                    <span className="complexity-chip space">
                      💾 Space: {currentApproach?.spaceComplexity || editorial.spaceComplexity}
                    </span>
                  </div>

                  <p className="editorial-approach-text">
                    {currentApproach?.description || currentApproach?.approach || editorial.approach}
                  </p>

                  {(currentApproach?.keyTakeaway || editorial.keyTakeaway) && (
                    <div className="editorial-takeaway-box">
                      💡 <strong>Key Takeaway:</strong>{" "}
                      {currentApproach?.keyTakeaway || editorial.keyTakeaway}
                    </div>
                  )}

                  {editorial.dryRun && (
                    <div className="dry-run-card">
                      <div className="dry-run-title">
                        <span>🔍</span> Step-by-Step Execution Dry Run
                      </div>
                      {editorial.dryRun.description && (
                        <div className="dry-run-desc">
                          Input: {editorial.dryRun.description}
                        </div>
                      )}
                      <div className="dry-run-table-wrapper">
                        <table className="dry-run-table">
                          <thead>
                            <tr>
                              {editorial.dryRun.headers.map((h, i) => (
                                <th key={i}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {editorial.dryRun.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {editorial.edgeCases && editorial.edgeCases.length > 0 && (
                    <div className="edge-cases-card">
                      <div className="edge-cases-title">
                        <span>⚠️</span> Interview Edge Cases to Handle
                      </div>
                      <ul className="edge-cases-list">
                        {editorial.edgeCases.map((ec, idx) => (
                          <li key={idx}>{ec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="editorial-code-header" style={{ marginTop: "16px" }}>
                    <div className="editorial-lang-tabs">
                      <button
                        type="button"
                        className={`editorial-lang-btn ${
                          editorialLang === "cpp" ? "active" : ""
                        }`}
                        onClick={() => setEditorialLang("cpp")}
                      >
                        C++ (GCC)
                      </button>
                      <button
                        type="button"
                        className={`editorial-lang-btn ${
                          editorialLang === "python" ? "active" : ""
                        }`}
                        onClick={() => setEditorialLang("python")}
                      >
                        Python 3
                      </button>
                    </div>

                    <div className="editorial-actions">
                      <button
                        type="button"
                        className="editorial-action-btn"
                        onClick={() => handleCopyEditorial(activeEditorialCode)}
                      >
                        {editorialCopied ? "✓ Copied" : "📋 Copy"}
                      </button>

                      <button
                        type="button"
                        className="editorial-action-btn insert-btn"
                        onClick={() =>
                          handleInsertSolution(
                            activeEditorialCode,
                            editorialLang
                          )
                        }
                      >
                        ⚡ Insert into Editor
                      </button>
                    </div>
                  </div>

                  <pre className="editorial-code-pre">
                    <code>{activeEditorialCode}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

        </section>

        {/* RIGHT SIDE */}

        <section className="editor-panel">

          <div className="editor-header">
            <div className="editor-controls-left">
              <select
                value={language}
                onChange={(event) => handleLanguageChange(event.target.value)}
                aria-label="Select Programming Language"
              >
                <option value="cpp">C++ (GCC)</option>
                <option value="python">Python 3</option>
              </select>

              <select
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
                aria-label="Select Editor Theme"
              >
                <option value="vs-dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
            </div>

            <div className="editor-controls-right">
              <button
                type="button"
                onClick={handleCopyCode}
                className="editor-tool-btn"
                title="Copy code to clipboard"
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>

              <button
                type="button"
                onClick={handleResetCode}
                className="editor-tool-btn reset-btn"
                title="Reset code to starter template"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          <div className="monaco-container">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              theme={theme}
            />
          </div>

          <div className="problem-navigation">
  <button
    onClick={() => {
      const previousProblem = problems.find(
        (item) => item.id === problem.id - 1
      );

      if (previousProblem) {
        router.push(`/problems/${previousProblem.id}/solve`);
      }
    }}
    disabled={problem.id === 1}
  >
    ← Previous
  </button>

  <button
    onClick={() => {
      const nextProblem = problems.find(
        (item) => item.id === problem.id + 1
      );

      if (nextProblem) {
        router.push(`/problems/${nextProblem.id}/solve`);
      }
    }}
    disabled={
      problem.id === problems[problems.length - 1].id
    }
  >
    Next →
  </button>
</div>

          <div className="editor-actions">

            <button
              className="run-button"
              onClick={() => handleRun(false)}
              disabled={running}
            >
              {running
                ? "Running..."
                : "▶ Run Code"}
            </button>

            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={running}
            >
              {running
                ? "Running..."
                : "Submit"}
            </button>

          </div>

          <div className="output-panel">
            <div className="output-tabs">
              <div className="output-tabs-left">
                <button
                  className={`output-tab-btn ${
                    activeTab === "testcases" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("testcases")}
                >
                  Test Result
                </button>
                <button
                  className={`output-tab-btn ${
                    activeTab === "custom" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("custom");
                    setUseCustomInput(true);
                  }}
                >
                  Custom Input
                </button>
                <button
                  className={`output-tab-btn ${
                    activeTab === "submissions" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("submissions");
                    if (submissions.length === 0) {
                      fetchSubmissions();
                    }
                  }}
                >
                  Submissions
                </button>
              </div>

              {activeTab === "testcases" && (
                <label className="custom-input-checkbox-label">
                  <input
                    type="checkbox"
                    checked={useCustomInput}
                    onChange={(e) => setUseCustomInput(e.target.checked)}
                  />
                  <span>Run Custom Input</span>
                </label>
              )}
            </div>

            {savedToCloud && (
              <div className="cloud-sync-badge">
                ✓ Submitted &amp; Saved to your Cloud Profile
              </div>
            )}

            {activeTab === "custom" && (
              <div className="custom-input-box">
                <label htmlFor="custom-input-area" className="custom-input-label">
                  <strong>Standard Input (stdin):</strong>
                </label>
                <textarea
                  id="custom-input-area"
                  rows={4}
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="Enter custom input (e.g., numbers separated by space or lines)..."
                />
                <div className="custom-input-actions">
                  <button
                    type="button"
                    className="custom-input-sample-btn"
                    onClick={() => {
                      if (problem?.testCases?.[0]?.input) {
                        setCustomInputText(problem.testCases[0].input);
                      }
                    }}
                  >
                    Load Sample Testcase
                  </button>
                  <span className="custom-input-hint">
                    Click <strong>&quot;▶ Run Code&quot;</strong> to test with this input.
                  </span>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="submissions-container">
                {loadingSubmissions ? (
                  <p>Loading submission history...</p>
                ) : submissions.length === 0 ? (
                  <p className="output-placeholder">
                    No submissions yet. Submit your code to record history.
                  </p>
                ) : (
                  <div className="submission-list">
                    {submissions.map((sub, idx) => (
                      <div className="submission-item" key={sub._id || idx}>
                        <div>
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
                          <span style={{ marginLeft: "10px", color: "#6b7280" }}>
                            {sub.passed}/{sub.total} passed
                          </span>
                          {sub.runtimeMs > 0 && (
                            <span className="sub-runtime">⚡ {sub.runtimeMs} ms</span>
                          )}
                        </div>
                        <span className="sub-meta">
                          {new Date(sub.createdAt).toLocaleDateString()}{" "}
                          {new Date(sub.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "testcases" && (
              <>
            {!output && (
              <div className="testcases-idle-preview">
                <p className="output-placeholder" style={{ marginBottom: "12px" }}>
                  Run your code to evaluate against all test cases.
                </p>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  Available Test Cases:
                </div>
                {problem?.testCases?.map((tc, idx) => (
                  <div key={idx} className="test-case" style={{ marginBottom: "8px", background: "#f8fafc" }}>
                    <div className="test-case-header">
                      <strong>Test Case {idx + 1}</strong>
                    </div>
                    <div className="test-details" style={{ marginTop: "6px" }}>
                      <p>
                        <strong>Input:</strong> <code>{tc.input}</code>
                      </p>
                      <p>
                        <strong>Expected:</strong> <code>{tc.output}</code>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {output?.loading && (
              <p>
                Running test cases...
              </p>
            )}

            {output?.error && (
              <p className="error-message">
                {output.error}
              </p>
            )}

            {output &&
              !output.loading &&
              !output.error && (
                output.isCustom ? (
                  <div className="custom-output-result">
                    <div className="result-summary">
                      <strong>{output.verdict}</strong>
                      <span>Custom Input Execution</span>
                      {output.runtimeMs > 0 && (
                        <span className="runtime-badge">⚡ {output.runtimeMs} ms</span>
                      )}
                    </div>

                    <div className="custom-io-block">
                      <span className="io-title">Input</span>
                      <pre>{output.input || "(Empty input)"}</pre>
                    </div>

                    <div className="custom-io-block">
                      <span className="io-title">Output</span>
                      <pre>{output.output || "(No standard output)"}</pre>
                    </div>

                    {output.error && (
                      <div className="custom-io-block error-block">
                        <span className="io-title">Runtime Error</span>
                        <pre>{output.error}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="result-summary">
                      <strong>
                        {output.verdict}
                      </strong>

                      <span>
                        Passed: {output.passed}/
                        {output.total}
                      </span>

                      {typeof output.runtimeMs === "number" && output.runtimeMs > 0 && (
                        <span className="runtime-badge">⚡ {output.runtimeMs} ms</span>
                      )}
                    </div>

                    <div className="test-results">
                      {output.results.map((test) => {
                        const isExpanded =
                          expandedTests[test.testCase] !== undefined
                            ? expandedTests[test.testCase]
                            : !test.passed;

                        return (
                          <div
                            className={`test-case ${
                              test.passed ? "passed" : "failed"
                            }`}
                            key={test.testCase}
                          >
                            <div
                              className="test-case-header"
                              style={{ cursor: "pointer", userSelect: "none" }}
                              onClick={() =>
                                setExpandedTests((prev) => ({
                                  ...prev,
                                  [test.testCase]: !isExpanded,
                                }))
                              }
                            >
                              <strong>
                                {test.passed ? "✅" : "❌"} Test Case {test.testCase}
                              </strong>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {test.runtimeMs > 0 && (
                                  <span className="testcase-runtime">
                                    {test.runtimeMs} ms
                                  </span>
                                )}
                                <span style={{ fontSize: "11px", color: "#64748b" }}>
                                  {isExpanded ? "▲ Hide Details" : "▼ View Details"}
                                </span>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="test-details">
                                <p>
                                  <strong>Input:</strong>{" "}
                                  <code>{test.input}</code>
                                </p>
                                <p>
                                  <strong>Expected:</strong>{" "}
                                  <code>{test.expectedOutput}</code>
                                </p>
                                <p>
                                  <strong>Actual Output:</strong>{" "}
                                  <code>{test.actualOutput || "(No output)"}</code>
                                </p>
                                {test.error && (
                                  <p className="error-message">
                                    <strong>Error:</strong> {test.error}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )
              )}
          </>
        )}

          </div>

        </section>

      </div>

    </main>
  );
}