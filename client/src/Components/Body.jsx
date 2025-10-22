import React, { useState, useRef, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

// ---------- CodeMirror Editor ----------
const CodeMirrorEditor = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    viewRef.current?.destroy();

    const state = EditorState.create({
      doc: value ?? "",
      extensions: [
        basicSetup,
        javascript(),
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.changes && typeof onChange === "function") {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = new EditorView({ state, parent: editorRef.current });
    return () => viewRef.current?.destroy();
  }, [readOnly]);

  useEffect(() => {
    if (!viewRef.current) return;
    const currentDoc = viewRef.current.state.doc.toString();
    if (currentDoc !== (value ?? "")) {
      viewRef.current.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value ?? "" },
      });
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      className={`border rounded-md ${readOnly ? "bg-gray-100" : "bg-white"}`}
      style={{ height: "100%" }}
    />
  );
};

// ---------- Collapsible Tree ----------
const JsonTreeNode = ({ name, data, level = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const isObject = typeof data === "object" && data !== null;
  const size = Array.isArray(data)
    ? data.length
    : isObject
    ? Object.keys(data).length
    : 0;

  const toggle = () => setExpanded((s) => !s);

  return (
    <div style={{ paddingLeft: level * 18, fontFamily: "monospace" }}>
      {isObject ? (
        <div>
          <div
            onClick={toggle}
            style={{
              cursor: "pointer",
              color: "#0e2472ff",
              fontWeight: 600,
              userSelect: "none",
              marginBottom: 4,
            }}
          >
            {expanded ? "▼" : "▶"}{" "}
            <span style={{ color: "#111827" }}>
              {name ?? (Array.isArray(data) ? "array" : "object")}
            </span>{" "}
            <span style={{ color: "#6B7280", fontWeight: 500 }}>
              {Array.isArray(data) ? `[${size}]` : `{${size}}`}
            </span>
          </div>

          {expanded &&
            Object.entries(data).map(([key, value], idx) => (
              <JsonTreeNode
                key={`${key}-${idx}`}
                name={key}
                data={value}
                level={level + 1}
              />
            ))}
        </div>
      ) : (
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: "#374151", fontWeight: 500 }}>{name}</span>
          <span>: </span>
          <span style={{ color: "#059669" }}>{String(data)}</span>
        </div>
      )}
    </div>
  );
};

const JsonTreeCollapsible = ({ data }) => {
  if (data === null || data === undefined) {
    return <div style={{ color: "#6B7280", padding: 12 }}>No data to display</div>;
  }

  let parsed = data;

  if (typeof data === "string") {
    try {
      // Handle JavaScript: remove `const data =` and trailing ;
      if (data.trim().startsWith("const data")) {
        const jsonPart = data.replace(/^const\s+\w+\s*=\s*/, "").replace(/;$/, "");
        parsed = JSON.parse(jsonPart);
      } else {
        // Handle Python: convert True/False/None to true/false/null
        const converted = data
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/\bNone\b/g, "null");
        parsed = JSON.parse(converted);
      }
    } catch {
      return (
        <div style={{ color: "#b91c1c", padding: 12 }}>
          Cannot render as Tree. Displaying fallback:
          <pre>{data}</pre>
        </div>
      );
    }
  }

  if (typeof parsed !== "object") {
    return (
      <div style={{ color: "#b91c1c", padding: 12 }}>
        Tree view requires a JSON object or array.
        <pre>{data}</pre>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: 14,
        height: "100%",
        overflow: "auto",
        padding: 8,
      }}
    >
      <JsonTreeNode data={parsed} />
    </div>
  );
};

// ---------- JSON Parser ----------
const Body = () => {
  const [inputJSON, setInputJSON] = useState(`{
  "name": "Nila",
  "age": 21,
  "skills": ["React", "Python", "Machine Learning"]
}`);
  const [outputJSON, setOutputJSON] = useState(null);
  const [viewMode, setViewMode] = useState("code");

  const handleParseJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      setOutputJSON(parsed);
    } catch (err) {
      setOutputJSON("Invalid JSON: " + err.message);
    }
  };

  const handleConvertToPython = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const pythonDict = JSON.stringify(parsed, null, 2)
        .replace(/\btrue\b/g, "True")
        .replace(/\bfalse\b/g, "False")
        .replace(/\bnull\b/g, "None");
      setOutputJSON(pythonDict);
    } catch (err) {
      setOutputJSON("Invalid JSON: " + err.message);
    }
  };

  const handleConvertToJS = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const jsObject = "const data = " + JSON.stringify(parsed, null, 2) + ";";
      setOutputJSON(jsObject);
    } catch (err) {
      setOutputJSON("Invalid JSON: " + err.message);
    }
  };

  const handleCopyOutput = () => {
    const text =
      typeof outputJSON === "string"
        ? outputJSON
        : JSON.stringify(outputJSON, null, 2);
    navigator.clipboard.writeText(text);
    alert("Output copied to clipboard!");
  };

  const renderOutput = () => {
    if (outputJSON === null) {
      return <div className="text-gray-500 p-3">Output will appear here</div>;
    }

    if (viewMode === "tree") {
      return <JsonTreeCollapsible data={outputJSON} />;
    }

    return (
      <CodeMirrorEditor
        value={
          typeof outputJSON === "string"
            ? outputJSON
            : JSON.stringify(outputJSON, null, 2)
        }
        readOnly={true}
      />
    );
  };

  return (
    <div className="min-h-[90vh] bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 mt-12 text-center">
        JSON PARSER
      </h1>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-6xl flex-1">
        {/* Input Editor */}
        <div className="w-full md:w-[45%] flex flex-col h-[70vh]">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Input JSON
          </h2>
          <CodeMirrorEditor value={inputJSON} onChange={setInputJSON} />
        </div>

        {/* Center Buttons */}
        <div className="flex flex-col justify-center items-center md:h-[70vh] gap-3">
          <button
            onClick={handleParseJSON}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md"
          >
            Parse JSON
          </button>

          <div className="flex gap-3 justify-center mt-2">
            <button
              onClick={handleConvertToPython}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            >
              Python
            </button>
            <button
              onClick={handleConvertToJS}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            >
              JavaScript
            </button>
          </div>
        </div>

        {/* Output Editor */}
        <div className="w-full md:w-[45%] flex flex-col h-[70vh]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Output</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("code")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "code"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setViewMode("tree")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "tree"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Tree
              </button>
              <button
                onClick={() => setViewMode("text")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "text"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Text
              </button>
              <button
                onClick={handleCopyOutput}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-md text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="border rounded-md bg-gray-100 flex-1 overflow-auto">
            {renderOutput()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
