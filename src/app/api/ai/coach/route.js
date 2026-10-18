import { GoogleGenAI } from "@google/genai";

// Supported models in preferred order (Google AI Studio free tier models)
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      problemId,
      problemTitle,
      problemDescription,
      code,
      language,
      mode = "explain_mistake", // 'explain_mistake' | 'socratic_nudge' | 'code_review' | 'custom_question'
      verdict,
      failingTestCase,
      userQuestion,
      sessionApiKey, // Optional key passed from client session if not yet in .env
    } = body;

    const apiKey =
      sessionApiKey?.trim() ||
      process.env.GEMINI_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          needsApiKey: true,
          message:
            "Gemini API Key is not configured yet. Please add GEMINI_API_KEY=your_api_key to .env.local and save the file, or enter it in the AI panel.",
        },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build specialized prompt depending on mode
    let systemInstruction = `You are a world-class, encouraging senior FAANG technical interviewer and DSA coach.
Your mission is to guide students Socratically:
- Do NOT immediately dump full solution code unless explicitly asked.
- Help them recognize logic flaws, edge cases, off-by-one errors, or data structure inefficiencies.
- Use clear, concise Markdown with bullet points and bold highlights.
- Keep responses focused, actionable, and under 300 words so the student stays in flow.`;

    let userPrompt = "";

    if (mode === "explain_mistake") {
      userPrompt = `Problem: ${problemTitle || "DSA Problem"}
Description:
${problemDescription || "N/A"}

Student's Language: ${language}
Student's Code:
\`\`\`${language}
${code || "// No code provided"}
\`\`\`

Execution Verdict: ${verdict || "FAILED"}
Failing Test Case:
- Input: ${failingTestCase?.input ?? "N/A"}
- Expected Output: ${failingTestCase?.expectedOutput ?? "N/A"}
- Actual Output: ${failingTestCase?.actualOutput ?? "N/A"}
${failingTestCase?.error ? `- Error: ${failingTestCase.error}` : ""}

Task:
1. Explain in simple terms WHY their code produced the wrong output on this test case.
2. Highlight the specific line or logic step where the invariant breaks.
3. Give a Socratic hint or guiding question to help them fix it themselves without giving away the full solution.`;
    } else if (mode === "code_review") {
      userPrompt = `Problem: ${problemTitle || "DSA Problem"}
Student's Language: ${language}
Student's Accepted Solution:
\`\`\`${language}
${code || "// No code provided"}
\`\`\`

Task:
1. State the exact Time Complexity ($O(...)$) and Space Complexity ($O(...)$) of this solution with a 1-sentence justification.
2. Is this the optimal theoretical complexity for this problem? If yes, celebrate their success. If a faster or lower-memory approach exists, briefly mention the technique (e.g. "Two pointers can achieve O(1) space instead of O(N) hash map").
3. Give 1 or 2 clean-code / idiomatic tips for ${language} if applicable.`;
    } else if (mode === "socratic_nudge") {
      userPrompt = `Problem: ${problemTitle || "DSA Problem"}
Description:
${problemDescription || "N/A"}

Student's Language: ${language}
Current Working Code:
\`\`\`${language}
${code || "// Starter code"}
\`\`\`

Student is currently stuck and asked for a nudge.
Task:
Provide a gentle Socratic nudge:
1. What pattern or mental model fits this problem (e.g. sliding window, monotonic stack, two pointers, prefix sums)?
2. Ask 1 or 2 guiding questions about edge cases or base cases they should consider.
3. Do NOT provide the final code.`;
    } else {
      // custom_question
      userPrompt = `Problem: ${problemTitle || "DSA Problem"}
Student's Language: ${language}
Current Code:
\`\`\`${language}
${code || "// No code"}
\`\`\`

Student's Question:
"${userQuestion || "Can you explain how to approach this problem?"}"

Task: Answer the student's question clearly, encouragingly, and concisely as a senior DSA mentor.`;
    }

    let responseText = null;
    let usedModel = null;
    let lastError = null;

    // Try candidate models
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });

        if (response && response.text) {
          responseText = response.text;
          usedModel = model;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next fallback:`, err.message);
      }
    }

    if (!responseText) {
      const errorMessage =
        lastError?.message || "Failed to generate AI feedback with available models.";
      const isAuthError =
        errorMessage.includes("API_KEY_INVALID") ||
        errorMessage.includes("400") ||
        errorMessage.includes("403");

      return Response.json(
        {
          success: false,
          needsApiKey: isAuthError,
          error: isAuthError
            ? "Invalid Gemini API key. Please verify the key from Google AI Studio (aistudio.google.com)."
            : errorMessage,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      feedback: responseText,
      model: usedModel,
      mode,
    });
  } catch (error) {
    console.error("AI Coach API Route Error:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred in AI Coach.",
      },
      { status: 500 }
    );
  }
}
