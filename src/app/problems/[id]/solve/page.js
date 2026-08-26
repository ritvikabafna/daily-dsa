"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import problems from "../../../data/problems";
import CodeEditor from "../../../components/CodeEditor";

export default function SolvePage() {
  const params = useParams();

  const problem = problems.find(
    (item) => item.id === Number(params.id)
  );

  const [code, setCode] = useState(
`class Solution {
public:
    // Write your solution here

};`
  );

  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");

  if (!problem) {
    return (
      <main>
        <h1>Problem Not Found</h1>
      </main>
    );
  }

const handleRun = async () => {
  setOutput("Running test cases...");

  try {
    const response = await fetch(
      "/api/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          problemId: problem.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setOutput(
        data.error || "Execution failed."
      );
      return;
    }

    const result = data.result;

    let testOutput =
      `${result.verdict}\n\n` +
      `Passed: ${result.passed}/${result.total}\n\n`;

    result.results.forEach((test) => {
      testOutput +=
        `${test.passed ? "✅" : "❌"} ` +
        `Test Case ${test.testCase}\n`;

      if (!test.passed) {
        testOutput +=
          `Expected: ${test.expectedOutput}\n` +
          `Actual: ${test.actualOutput}\n\n`;
      }
    });

    setOutput(testOutput);
  } catch (error) {
    console.error(error);

    setOutput(
      "Could not connect to execution server."
    );
  }
};

  const handleSubmit = () => {
    setOutput("Submission system will be connected soon...");
  };

  return (
    <main className="solve-page">

      <div className="solve-header">
        <a href={`/problems/${problem.id}`}>
          ← Back to Problem
        </a>

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
            <div className="solve-example" key={index}>
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
            {problem.constraints.map((constraint, index) => (
              <li key={index}>
                {constraint}
              </li>
            ))}
          </ul>

        </section>

        {/* RIGHT SIDE */}

        <section className="editor-panel">

          <div className="editor-header">

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">
                JavaScript
              </option>
            </select>

          </div>

          <div className="monaco-container">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>

          <div className="editor-actions">

            <button
              className="run-button"
              onClick={handleRun}
            >
              ▶ Run Code
            </button>

            <button
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit
            </button>

          </div>

          <div className="output-panel">

            <h3>Test Result</h3>

            {output ? (
              <p>{output}</p>
            ) : (
              <p className="output-placeholder">
                Run your code to see the result.
              </p>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}