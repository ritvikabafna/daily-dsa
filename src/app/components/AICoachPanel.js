"use client";

import { useState } from "react";

export default function AICoachPanel({
  isOpen,
  onClose,
  problem,
  code,
  language,
  lastVerdict,
  failingTestCase,
  initialMode = "explain_mistake",
  onApplyCodeSnippet,
}) {
  const [mode, setMode] = useState(initialMode);
  const [hintTier, setHintTier] = useState(1);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [sessionKey, setSessionKey] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [copied, setCopied] = useState(false);

  // Quick suggestion chips
  const quickPrompts = [
    { label: "🔍 What edge case am I missing?", prompt: "What edge case or boundary input could be causing this to fail?" },
    { label: "⏱️ Can we optimize time complexity?", prompt: "Is my time complexity optimal, or is there a faster pattern?" },
    { label: "💡 Nudge without spoiler", prompt: "Give me a small conceptual hint about which algorithm or invariant to think about without writing code." },
  ];

  const handleAsk = async (selectedMode = mode, specificQuestion = null, tier = hintTier) => {
    setLoading(true);
    setError(null);
    setNeedsApiKey(false);

    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem?.id,
          problemTitle: problem?.title,
          problemDescription: problem?.description,
          code,
          language,
          mode: selectedMode,
          hintTier: tier,
          verdict: lastVerdict,
          failingTestCase,
          userQuestion: specificQuestion || customQuestion,
          sessionApiKey: sessionKey.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.needsApiKey) {
          setNeedsApiKey(true);
        }
        setError(data.message || data.error || "Failed to get AI Coach guidance.");
        setResponse(null);
        return;
      }

      setResponse(data.feedback);
      setMode(selectedMode);
    } catch (err) {
      console.error("AI Coach query error:", err);
      setError("Network error contacting AI Coach. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="ai-coach-overlay" onClick={onClose}>
      <aside
        className="ai-coach-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Gemini AI DSA Coach"
      >
        {/* Header */}
        <div className="ai-coach-header">
          <div className="ai-coach-title-wrap">
            <span className="ai-sparkle-badge">✨ Gemini AI</span>
            <h3 className="ai-coach-title">Socratic DSA Coach</h3>
          </div>
          <button
            type="button"
            className="ai-coach-close-btn"
            onClick={onClose}
            title="Close AI Coach"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="ai-coach-tabs">
          <button
            type="button"
            className={`ai-tab-btn ${mode === "tiered_hint" ? "active" : ""}`}
            onClick={() => {
              setMode("tiered_hint");
              handleAsk("tiered_hint", null, hintTier);
            }}
          >
            🌱 3-Tier Hints
          </button>
          <button
            type="button"
            className={`ai-tab-btn ${mode === "explain_mistake" ? "active" : ""}`}
            onClick={() => {
              setMode("explain_mistake");
              handleAsk("explain_mistake");
            }}
          >
            🐞 Explain Mistake
          </button>
          <button
            type="button"
            className={`ai-tab-btn ${mode === "socratic_nudge" ? "active" : ""}`}
            onClick={() => {
              setMode("socratic_nudge");
              handleAsk("socratic_nudge");
            }}
          >
            💡 Nudge
          </button>
          <button
            type="button"
            className={`ai-tab-btn ${mode === "code_review" ? "active" : ""}`}
            onClick={() => {
              setMode("code_review");
              handleAsk("code_review");
            }}
          >
            🌟 Complexity & Review
          </button>
        </div>

        {/* 3-Tier Hint Sub-selector when in tiered_hint mode */}
        {mode === "tiered_hint" && (
          <div className="ai-hint-tier-bar">
            <span className="tier-bar-label">Progressive Hint Level:</span>
            <div className="tier-pills">
              <button
                type="button"
                className={`tier-pill ${hintTier === 1 ? "active" : ""}`}
                onClick={() => {
                  setHintTier(1);
                  handleAsk("tiered_hint", null, 1);
                }}
              >
                🌱 Tier 1: Intuition
              </button>
              <button
                type="button"
                className={`tier-pill ${hintTier === 2 ? "active" : ""}`}
                onClick={() => {
                  setHintTier(2);
                  handleAsk("tiered_hint", null, 2);
                }}
              >
                🌿 Tier 2: Pattern
              </button>
              <button
                type="button"
                className={`tier-pill ${hintTier === 3 ? "active" : ""}`}
                onClick={() => {
                  setHintTier(3);
                  handleAsk("tiered_hint", null, 3);
                }}
              >
                🌳 Tier 3: Pseudocode
              </button>
            </div>
          </div>
        )}

        {/* Context bar */}
        <div className="ai-coach-context-bar">
          <span className="context-item">
            <strong>Problem:</strong> #{problem?.id} {problem?.title}
          </span>
          <span className="context-item">
            <strong>Language:</strong> {language?.toUpperCase()}
          </span>
          {lastVerdict && (
            <span
              className={`context-item verdict ${
                lastVerdict === "ACCEPTED" ? "acc" : "wrong"
              }`}
            >
              {lastVerdict}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="ai-coach-body">
          {/* Missing API Key Warning Banner */}
          {needsApiKey && (
            <div className="ai-key-warning-card">
              <div className="ai-key-warning-title">
                <span>🔑 Gemini API Key Required</span>
              </div>
              <p className="ai-key-warning-desc">
                To activate instant AI hints &amp; explanations, paste your key below or save it as <code>GEMINI_API_KEY=AIzaSy...</code> in <code>.env.local</code>.
              </p>
              <div className="ai-key-input-row">
                <input
                  type="password"
                  placeholder="Paste AI Studio Key (AIzaSy...)"
                  value={sessionKey}
                  onChange={(e) => setSessionKey(e.target.value)}
                  className="ai-key-input"
                />
                <button
                  type="button"
                  className="ai-key-save-btn"
                  onClick={() => handleAsk(mode)}
                  disabled={!sessionKey.trim()}
                >
                  Connect Key
                </button>
              </div>
              <span className="ai-key-hint">
                Don&apos;t have a key? Get one in 10 seconds at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">aistudio.google.com</a> (100% Free).
              </span>
            </div>
          )}

          {/* Quick Prompts */}
          <div className="ai-quick-prompts">
            <span className="quick-prompts-label">Quick questions:</span>
            <div className="quick-prompts-list">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-prompt-chip"
                  onClick={() => {
                    setCustomQuestion(qp.prompt);
                    handleAsk("custom_question", qp.prompt);
                  }}
                  disabled={loading}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="ai-coach-loading">
              <div className="ai-pulse-dot"></div>
              <span>Gemini is analyzing your code and test cases...</span>
            </div>
          )}

          {/* Error Message */}
          {error && !needsApiKey && (
            <div className="ai-coach-error-box">
              <strong>Notice:</strong> {error}
            </div>
          )}

          {/* Response Display */}
          {response && !loading && (
            <div className="ai-coach-response-box">
              <div className="response-header">
                <span className="response-title">
                  {mode === "tiered_hint"
                    ? hintTier === 1
                      ? "🌱 Tier 1: Intuition & Mental Model"
                      : hintTier === 2
                      ? "🌿 Tier 2: Algorithmic Pattern & Invariant"
                      : "🌳 Tier 3: Pseudocode & Edge Cases"
                    : mode === "explain_mistake"
                    ? "🐞 Mistake Analysis & Hint"
                    : mode === "socratic_nudge"
                    ? "💡 Socratic Nudge"
                    : mode === "code_review"
                    ? "🌟 Complexity & Code Review"
                    : "🤖 AI Mentor Answer"}
                </span>
                <button
                  type="button"
                  className="ai-copy-btn"
                  onClick={handleCopy}
                >
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
              </div>
              <div className="response-content">
                <pre className="ai-markdown-text">{response}</pre>
              </div>
            </div>
          )}

          {/* Initial Prompt to Ask */}
          {!response && !loading && !error && !needsApiKey && (
            <div className="ai-coach-placeholder">
              <p>
                Click any tab above or ask a question below to receive personalized Socratic coaching from Gemini.
              </p>
            </div>
          )}
        </div>

        {/* Custom Question Input Footer */}
        <div className="ai-coach-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customQuestion.trim() && !loading) {
                handleAsk("custom_question", customQuestion);
              }
            }}
            className="ai-ask-form"
          >
            <input
              type="text"
              className="ai-question-input"
              placeholder="Ask anything about your code or this problem..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="ai-send-btn"
              disabled={loading || !customQuestion.trim()}
            >
              Ask AI
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
