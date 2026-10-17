"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language,
  theme = "vs-dark",
}) {
  return (
    <Editor
      height="100%"
      language={language}
      theme={theme}
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        fontSize: 15,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        tabSize: 4,
        padding: {
          top: 15,
        },
        scrollBeyondLastLine: false,
      }}
    />
  );
}