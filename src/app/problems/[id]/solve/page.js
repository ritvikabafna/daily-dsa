"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import problems from "../../../data/problems";
import { getEditorial } from "../../../data/editorials";
import CodeEditor from "../../../components/CodeEditor";
import ThemeToggle from "../../../components/ThemeToggle";
import {
  getStoredRevisionSchedule,
  saveStoredRevisionSchedule,
  recordRevisionCompletion,
} from "../../../utils/revisionSystem";
import {
  calculateSubmissionAnalytics,
  compareAttempts,
} from "../../../utils/submissionAnalytics";
import AICoachPanel from "../../../components/AICoachPanel";

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

function saveLocalSubmission(problemId, language, result, submittedCode) {
  if (typeof window === "undefined") return;
  try {
    const stored = JSON.parse(
      localStorage.getItem("daily_dsa_local_submissions") || "[]"
    );
    stored.unshift({
      _id: `local-${Date.now()}-${problemId}`,
      problemId,
      language,
      code: submittedCode || "",
      verdict: result.verdict,
      passed: result.passed || 0,
      total: result.total || 0,
      runtimeMs: result.runtimeMs || 0,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "daily_dsa_local_submissions",
      JSON.stringify(stored.slice(0, 100))
    );
  } catch (e) {
    console.error("Local submission store error:", e);
  }
}

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
  const [isRevisionSession, setIsRevisionSession] = useState(false);
  const [revisionMeta, setRevisionMeta] = useState(null);
  const [revisionLoggedToast, setRevisionLoggedToast] = useState(null);

  // Submission Analytics & Attempt Comparison state
  const [compareMode, setCompareMode] = useState(false);
  const [compareAttemptAIndex, setCompareAttemptAIndex] = useState(0);
  const [compareAttemptBIndex, setCompareAttemptBIndex] = useState(1);
  const [expandedCodeId, setExpandedCodeId] = useState(null);
  const [reopenToast, setReopenToast] = useState(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [aiCoachOpen, setAiCoachOpen] = useState(false);
  const [aiCoachMode, setAiCoachMode] = useState("explain_mistake");
  const [aiFailingTestCase, setAiFailingTestCase] = useState(null);

  const problemId = problem ? problem.id : null;
  const editorial = getEditorial(problem);

  const analytics = calculateSubmissionAnalytics(submissions);

  const handleReopenCode = (att) => {
    if (!att || !att.code) {
      alert("No saved code available for this attempt.");
      return;
    }
    const targetLang = att.language || language || "cpp";
    if (targetLang !== language) {
      setLanguage(targetLang);
    }
    setCode(att.code);
    if (problemId) {
      localStorage.setItem(`problem-${problemId}-${targetLang}-code`, att.code);
    }
    setActiveTab("testcases");
    setReopenToast(
      `✓ Reopened Attempt #${att.attemptNumber || ""} (${targetLang.toUpperCase()}) into editor.`
    );
    setTimeout(() => setReopenToast(null), 4000);
  };

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

  const handleEditorThemeChange = (newTheme) => {
    setTheme(newTheme);
    const globalMode = newTheme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", globalMode);
    localStorage.setItem("daily_dsa_theme", globalMode);
    window.dispatchEvent(
      new CustomEvent("themechange", { detail: globalMode })
    );
  };

  const handleRecordRevision = (rating) => {
    if (!problemId) return;
    const sched = getStoredRevisionSchedule();
    if (!sched[problemId]) {
      sched[problemId] = {
        problemId,
        title: problem?.title || "Problem",
        difficulty: problem?.difficulty || "Medium",
        topic: problem?.topic || "General",
        firstSolvedDate: new Date().toISOString(),
        lastRevisedDate: null,
        revisionCount: 0,
        currentIntervalDays: 5,
        difficultyRating: "medium",
        nextDueDate: new Date().toISOString(),
        struggled: false,
        failureCount: 0,
        history: [],
      };
    }
    const updated = recordRevisionCompletion({
      existingSchedule: sched,
      problemId,
      rating,
      revisionDate: new Date(),
    });
    saveStoredRevisionSchedule(updated);
    setRevisionMeta(updated[problemId]);
    setRevisionLoggedToast(
      `✓ Revision recorded as ${rating.toUpperCase()}! Next review in ${
        updated[problemId].currentIntervalDays
      } days.`
    );
    setTimeout(() => setRevisionLoggedToast(null), 4000);
  };

  const fetchSubmissions = async () => {
    if (!problemId) return;
    setLoadingSubmissions(true);
    try {
      let cloudSubs = [];
      try {
        const res = await fetch(`/api/submissions?problemId=${problemId}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.submissions)) {
          cloudSubs = data.submissions;
        }
      } catch (err) {
        console.warn("Submissions API warning:", err);
      }

      let localSubs = [];
      if (typeof window !== "undefined") {
        try {
          const stored = JSON.parse(
            localStorage.getItem("daily_dsa_local_submissions") || "[]"
          );
          localSubs = stored.filter((s) => s.problemId === problemId);
        } catch {}
      }

      const merged = [...cloudSubs];
      for (const loc of localSubs) {
        const exists = merged.some(
          (c) =>
            c._id === loc._id ||
            Math.abs(new Date(c.createdAt).getTime() - new Date(loc.createdAt).getTime()) < 3000
        );
        if (!exists) {
          merged.push(loc);
        }
      }

      merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSubmissions(merged);

      // Check URL for reopening a specific submission
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const reopenId = urlParams.get("reopen");
        if (reopenId) {
          const target = merged.find((s) => s._id === reopenId);
          if (target && target.code) {
            if (target.language) setLanguage(target.language);
            setCode(target.code);
            setReopenToast(`✓ Reopened code from submission (${target.language?.toUpperCase() || "CPP"})`);
            setTimeout(() => setReopenToast(null), 4000);
          }
        }
      }
    } catch (err) {
      console.error("Submissions load error:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    let timer;
    const handleGlobalThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail === "light" ? "light" : "vs-dark");
      }
    };

    window.addEventListener("themechange", handleGlobalThemeChange);

    timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("daily_dsa_theme");
      if (savedTheme) {
        setTheme(savedTheme === "light" ? "light" : "vs-dark");
      }

      // Detect if accessed as revision
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const isRev = urlParams.get("revision") === "true";
        const sched = getStoredRevisionSchedule();
        if (problemId && (isRev || sched[problemId])) {
          setIsRevisionSession(true);
          if (sched[problemId]) {
            setRevisionMeta(sched[problemId]);
          }
        }
      }

      fetchSubmissions();
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("themechange", handleGlobalThemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

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

      if (!data.result.isCustom && data.result.verdict) {
        saveLocalSubmission(problem.id, language, data.result, code);
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
    <main className="solve-page" suppressHydrationWarning>

      <div className="solve-header">
        <div className="solve-header-left">
          <Link href={`/problems/${problem.id}`} className="solve-back-link">
            ← Back to Problem
          </Link>

          <h1>{problem.title}</h1>

          <span
            className={`difficulty ${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>

          {isRevisionSession && (
            <span className="revision-active-pill">
              🔄 Revision Mode
            </span>
          )}
        </div>

        <div className="solve-header-right">
          <ThemeToggle />
        </div>
      </div>

      {isRevisionSession && (
        <div className="solve-revision-banner">
          <div className="revision-banner-text">
            <strong>🔄 Smart Revision Active:</strong> Practicing this problem to reinforce algorithmic patterns and strengthen your spaced repetition interval.
            {revisionMeta?.struggled && (
              <span className="revision-banner-alert">
                {" "}• ⚠️ Note: You previously had {revisionMeta.failureCount} failed attempts on this problem.
              </span>
            )}
          </div>
        </div>
      )}

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

                <div className="hints-ai-cta">
                  <button
                    type="button"
                    className="ai-nudge-btn"
                    onClick={() => {
                      setAiCoachMode("socratic_nudge");
                      setAiCoachOpen(true);
                    }}
                  >
                    ✨ Ask AI Coach for a Socratic Nudge
                  </button>
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
                onChange={(event) => handleEditorThemeChange(event.target.value)}
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

            <button
              type="button"
              className="ai-coach-action-btn"
              onClick={() => {
                setAiCoachMode(
                  output?.verdict === "ACCEPTED" ? "code_review" : "socratic_nudge"
                );
                setAiCoachOpen(true);
              }}
              title="Get Socratic Hints and Explanations from Gemini AI"
            >
              ✨ AI Coach
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
                {reopenToast && (
                  <div className="reopen-toast-notification">
                    <span>{reopenToast}</span>
                    <button type="button" onClick={() => setReopenToast(null)}>✕</button>
                  </div>
                )}

                {loadingSubmissions ? (
                  <p>Loading submission history &amp; analytics...</p>
                ) : analytics.totalAttempts === 0 ? (
                  <div className="submissions-empty-state">
                    <p className="output-placeholder">
                      No submissions recorded yet for this problem. Click <strong>&quot;Submit&quot;</strong> to benchmark your solution and track attempt history.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Analytics Summary Banner */}
                    <div className="solve-sub-analytics-strip">
                      <div className="solve-sub-metric">
                        <span className="sub-metric-lbl">Total Attempts</span>
                        <span className="sub-metric-val">{analytics.totalAttempts}</span>
                        <span className="sub-metric-sub">
                          {analytics.acceptedCount > 0 ? `✓ Accepted (${analytics.acceptanceRate}%)` : "Unsolved"}
                        </span>
                      </div>

                      <div className="solve-sub-metric">
                        <span className="sub-metric-lbl">Best Runtime</span>
                        <span className="sub-metric-val" style={{ color: "#059669" }}>
                          {analytics.bestRuntimeMs !== null ? `${analytics.bestRuntimeMs} ms` : "—"}
                        </span>
                        <span className="sub-metric-sub">
                          {analytics.runtimeSpeedupPercent !== null && analytics.runtimeSpeedupPercent > 0
                            ? `⚡ ${analytics.runtimeSpeedupPercent}% speedup`
                            : "Best execution"}
                        </span>
                      </div>

                      <div className="solve-sub-metric">
                        <span className="sub-metric-lbl">Runtime Delta</span>
                        <span
                          className="sub-metric-val"
                          style={{
                            color:
                              analytics.runtimeChangeOverall !== null && analytics.runtimeChangeOverall < 0
                                ? "#059669"
                                : analytics.runtimeChangeOverall !== null && analytics.runtimeChangeOverall > 0
                                ? "#d97706"
                                : "#64748b",
                          }}
                        >
                          {analytics.runtimeChangeOverall !== null
                            ? `${analytics.runtimeChangeOverall > 0 ? "+" : ""}${analytics.runtimeChangeOverall} ms`
                            : "—"}
                        </span>
                        <span className="sub-metric-sub">
                          {analytics.runtimeChangeOverall !== null && analytics.runtimeChangeOverall < 0
                            ? "Faster vs Attempt 1"
                            : analytics.runtimeChangeOverall !== null && analytics.runtimeChangeOverall > 0
                            ? "Slower vs Attempt 1"
                            : "Single benchmark"}
                        </span>
                      </div>

                      {analytics.totalAttempts >= 2 && (
                        <button
                          type="button"
                          className={`compare-toggle-btn ${compareMode ? "active" : ""}`}
                          onClick={() => setCompareMode(!compareMode)}
                        >
                          {compareMode ? "✕ Close Compare" : "⚖️ Compare Attempts"}
                        </button>
                      )}
                    </div>

                    {/* Verdict Trend Sequence */}
                    <div className="solve-verdict-trend-card">
                      <div className="solve-trend-title">
                        <span>Verdict &amp; Runtime Trend:</span>
                      </div>
                      <div className="solve-trend-ribbon">
                        {analytics.attempts.map((att, idx) => (
                          <div key={att._id || idx} className="solve-trend-step">
                            <span
                              className={`trend-pill ${
                                att.verdict === "ACCEPTED"
                                  ? "accepted"
                                  : att.verdict === "WRONG_ANSWER"
                                  ? "wrong"
                                  : "other"
                              }`}
                            >
                              #{att.attemptNumber} {att.verdict === "ACCEPTED" ? "AC" : att.verdict === "WRONG_ANSWER" ? "WA" : att.verdict}
                              {att.runtimeMs ? ` (${att.runtimeMs}ms)` : ""}
                            </span>
                            {idx < analytics.attempts.length - 1 && (
                              <span className="trend-arrow">➔</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Side-by-Side Attempt Comparison Mode */}
                    {compareMode && analytics.attempts.length >= 2 && (
                      <div className="solve-compare-container">
                        <div className="solve-compare-selectors">
                          <div>
                            <label>Attempt A:</label>
                            <select
                              value={compareAttemptAIndex}
                              onChange={(e) => setCompareAttemptAIndex(Number(e.target.value))}
                            >
                              {analytics.attempts.map((att, idx) => (
                                <option key={idx} value={idx}>
                                  Attempt #{att.attemptNumber} ({att.verdict}, {att.runtimeMs || 0}ms)
                                </option>
                              ))}
                            </select>
                          </div>
                          <span style={{ fontWeight: 800, color: "#94a3b8" }}>vs</span>
                          <div>
                            <label>Attempt B:</label>
                            <select
                              value={compareAttemptBIndex}
                              onChange={(e) => setCompareAttemptBIndex(Number(e.target.value))}
                            >
                              {analytics.attempts.map((att, idx) => (
                                <option key={idx} value={idx}>
                                  Attempt #{att.attemptNumber} ({att.verdict}, {att.runtimeMs || 0}ms)
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {(() => {
                          const attA = analytics.attempts[compareAttemptAIndex];
                          const attB = analytics.attempts[compareAttemptBIndex];
                          const comp = compareAttempts(attA, attB);
                          if (!comp) return null;

                          return (
                            <div className="solve-compare-results">
                              <div className="solve-compare-metrics">
                                <div className="comp-stat-box">
                                  <span className="comp-lbl">Verdict Change</span>
                                  <span className="comp-val">
                                    {attA.verdict} ➔ <strong>{attB.verdict}</strong>
                                  </span>
                                  {comp.verdictImproved && <span className="delta-tag success">✓ Fixed</span>}
                                  {comp.verdictRegressed && <span className="delta-tag danger">⚠️ Regressed</span>}
                                </div>
                                <div className="comp-stat-box">
                                  <span className="comp-lbl">Tests Passed</span>
                                  <span className="comp-val">
                                    {attA.passed}/{attA.total} ➔ <strong>{attB.passed}/{attB.total}</strong>
                                  </span>
                                  <span className={`delta-tag ${comp.passedDelta > 0 ? "success" : comp.passedDelta < 0 ? "danger" : "neutral"}`}>
                                    {comp.passedDelta > 0 ? `+${comp.passedDelta}` : comp.passedDelta} passed
                                  </span>
                                </div>
                                <div className="comp-stat-box">
                                  <span className="comp-lbl">Runtime Delta</span>
                                  <span className="comp-val">
                                    {attA.runtimeMs || 0}ms ➔ <strong>{attB.runtimeMs || 0}ms</strong>
                                  </span>
                                  {comp.runtimeDelta !== null && (
                                    <span className={`delta-tag ${comp.isFaster ? "success" : comp.runtimeDelta > 0 ? "warning" : "neutral"}`}>
                                      {comp.isFaster
                                        ? `⚡ ${Math.abs(comp.runtimeDelta)}ms faster (${comp.runtimePercent}%)`
                                        : comp.runtimeDelta > 0
                                        ? `↑ ${comp.runtimeDelta}ms slower`
                                        : "Same speed"}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="side-by-side-code-grid">
                                <div className="side-code-column">
                                  <div className="side-code-header">
                                    <span>Attempt #{attA.attemptNumber} ({attA.language.toUpperCase()})</span>
                                    <button
                                      type="button"
                                      className="reopen-editor-btn"
                                      onClick={() => handleReopenCode(attA)}
                                    >
                                      📂 Reopen in Editor
                                    </button>
                                  </div>
                                  <pre className="side-code-pre">{attA.code || "// No code available"}</pre>
                                </div>

                                <div className="side-code-column">
                                  <div className="side-code-header">
                                    <span>Attempt #{attB.attemptNumber} ({attB.language.toUpperCase()})</span>
                                    <button
                                      type="button"
                                      className="reopen-editor-btn"
                                      onClick={() => handleReopenCode(attB)}
                                    >
                                      📂 Reopen in Editor
                                    </button>
                                  </div>
                                  <pre className="side-code-pre">{attB.code || "// No code available"}</pre>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Attempt Rows List */}
                    <div className="submission-list">
                      {analytics.attemptsReversed.map((att) => {
                        const isLatest = att.attemptNumber === analytics.totalAttempts;
                        const isBest = att.runtimeMs !== null && att.runtimeMs === analytics.bestRuntimeMs;
                        const isExpanded = expandedCodeId === att._id;

                        return (
                          <div className="submission-item-enriched" key={att._id}>
                            <div className="submission-item-main">
                              <div className="submission-item-left">
                                <span className="att-number-badge">#{att.attemptNumber}</span>
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
                                <span className="sub-passed-count">
                                  {att.passed}/{att.total} passed
                                </span>
                                {att.runtimeMs > 0 && (
                                  <span className="sub-runtime">⚡ {att.runtimeMs} ms</span>
                                )}
                                {att.runtimeDelta !== null && (
                                  <span
                                    className={`runtime-delta-tag ${
                                      att.isFaster ? "faster" : att.runtimeDelta > 0 ? "slower" : "same"
                                    }`}
                                  >
                                    {att.isFaster
                                      ? `↓ ${Math.abs(att.runtimeDelta)}ms faster`
                                      : att.runtimeDelta > 0
                                      ? `↑ ${att.runtimeDelta}ms slower`
                                      : "±0ms"}
                                  </span>
                                )}
                                <span className="lang-badge">{att.language.toUpperCase()}</span>
                                {isLatest && <span className="att-tag-pill latest">Latest</span>}
                                {isBest && <span className="att-tag-pill best">Best</span>}
                              </div>

                              <div className="submission-item-right">
                                <span className="sub-meta">
                                  {new Date(att.createdAt).toLocaleDateString()}{" "}
                                  {new Date(att.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                <div className="sub-item-actions">
                                  <button
                                    type="button"
                                    className="view-code-inline-btn"
                                    onClick={() => setExpandedCodeId(isExpanded ? null : att._id)}
                                  >
                                    {isExpanded ? "✕ Hide Code" : "👁️ View Code"}
                                  </button>
                                  <button
                                    type="button"
                                    className="reopen-editor-btn"
                                    onClick={() => handleReopenCode(att)}
                                    title="Load this code into the editor"
                                  >
                                    📂 Reopen Code
                                  </button>
                                  {analytics.totalAttempts >= 2 && (
                                    <button
                                      type="button"
                                      className="compare-quick-btn"
                                      onClick={() => {
                                        setCompareMode(true);
                                        setCompareAttemptBIndex(analytics.attempts.findIndex((a) => a._id === att._id));
                                      }}
                                    >
                                      ⚖️
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Expanded Inline Code Preview */}
                            {isExpanded && (
                              <div className="sub-inline-code-box">
                                <div className="code-box-header">
                                  <span>Submitted {att.language.toUpperCase()} Code:</span>
                                  <button
                                    type="button"
                                    className="copy-inline-code-btn"
                                    onClick={async () => {
                                      try {
                                        await navigator.clipboard.writeText(att.code || "");
                                        setCopiedCodeId(att._id);
                                        setTimeout(() => setCopiedCodeId(null), 2000);
                                      } catch {}
                                    }}
                                  >
                                    {copiedCodeId === att._id ? "✓ Copied!" : "📋 Copy Code"}
                                  </button>
                                </div>
                                <pre className="sub-code-pre">{att.code || "// No code saved for this attempt"}</pre>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
                <div className="testcases-section-title">
                  Available Test Cases:
                </div>
                {problem?.testCases?.map((tc, idx) => (
                  <div key={idx} className="test-case">
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

                      {output.verdict !== "ACCEPTED" && (
                        <button
                          type="button"
                          className="ai-mistake-pill-btn"
                          onClick={() => {
                            const firstFailed = output.results?.find((r) => !r.passed);
                            setAiFailingTestCase(firstFailed || null);
                            setAiCoachMode("explain_mistake");
                            setAiCoachOpen(true);
                          }}
                        >
                          🤖 Explain Mistake with AI
                        </button>
                      )}

                      {output.verdict === "ACCEPTED" && (
                        <button
                          type="button"
                          className="ai-code-review-banner-btn"
                          onClick={() => {
                            setAiCoachMode("code_review");
                            setAiCoachOpen(true);
                          }}
                        >
                          ✨ AI Code Review
                        </button>
                      )}
                    </div>

                    {output.verdict === "ACCEPTED" && (
                      <div className="solve-revision-feedback-card">
                        <div className="revision-feedback-header">
                          <span className="feedback-icon">🔄</span>
                          <strong>Log Spaced Revision Recall:</strong>
                          <span className="feedback-sub">
                            How difficult was this solve?
                          </span>
                        </div>
                        <div className="revision-feedback-buttons">
                          <button
                            type="button"
                            className="rating-btn hard"
                            onClick={() => handleRecordRevision("difficult")}
                          >
                            🔴 Hard (+2d)
                          </button>
                          <button
                            type="button"
                            className="rating-btn medium"
                            onClick={() => handleRecordRevision("medium")}
                          >
                            🟡 Good (+5d)
                          </button>
                          <button
                            type="button"
                            className="rating-btn easy"
                            onClick={() => handleRecordRevision("easy")}
                          >
                            🟢 Easy (+14d)
                          </button>
                        </div>
                        {revisionLoggedToast && (
                          <div className="revision-logged-toast">
                            {revisionLoggedToast}
                          </div>
                        )}
                      </div>
                    )}

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
                                <span className="testcase-toggle-label">
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
                                {!test.passed && (
                                  <div className="testcase-ai-action-wrap">
                                    <button
                                      type="button"
                                      className="testcase-ai-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setAiFailingTestCase(test);
                                        setAiCoachMode("explain_mistake");
                                        setAiCoachOpen(true);
                                      }}
                                    >
                                      🤖 Ask AI: Why did this fail?
                                    </button>
                                  </div>
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

      <AICoachPanel
        isOpen={aiCoachOpen}
        onClose={() => setAiCoachOpen(false)}
        problem={problem}
        code={code}
        language={language}
        lastVerdict={output?.verdict}
        failingTestCase={aiFailingTestCase}
        initialMode={aiCoachMode}
      />

    </main>
  );
}