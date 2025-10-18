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
      doc: value,
      extensions: [
        basicSetup,
        javascript(),
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.changes && onChange) {
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
    if (currentDoc !== value) {
      viewRef.current.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
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
  const size = Array.isArray(data) ? data.length : isObject ? Object.keys(data).length : 0;

  const toggle = () => setExpanded(!expanded);

  return (
    <div style={{ paddingLeft: level * 20 }}>
      {isObject ? (
        <div>
          <span
            onClick={toggle}
            style={{ cursor: "pointer", color: "#0e2472ff", fontWeight: "500" }}
          >
            {expanded ? "▼" : "▶"} {name ? name : Array.isArray(data) ? "array" : "object"}{" "}
            {Array.isArray(data) ? `[${size}]` : `{${size}}`}
          </span>
          {expanded &&
            Object.entries(data).map(([key, value]) => (
              <JsonTreeNode key={key} name={key} data={value} level={level + 1} />
            ))}
        </div>
      ) : (
        <div>
          {name} : <span style={{ color: "#059669" }}>{String(data)}</span>
        </div>
      )}
    </div>
  );
};

const JsonTreeCollapsible = ({ data }) => {
  if (!data) return <span style={{ color: "#6B7280" }}>No data to display</span>;
  return (
    <div style={{ fontFamily: "monospace", fontSize: "14px", height: "100%", overflow: "auto" }}>
      <JsonTreeNode data={data} />
    </div>
  );
};

// ---------- JSON Parser ----------
const Body = () => {
  const [inputJSON, setInputJSON] = useState("");
  const [outputJSON, setOutputJSON] = useState(null);
  const [viewMode, setViewMode] = useState("code");

  const handleParseJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      setOutputJSON(parsed);
    } catch (err) {
      setOutputJSON({ error: err.message });
    }
  };

  const handleCopyOutput = () => {
    const text = JSON.stringify(outputJSON, null, 2);
    navigator.clipboard.writeText(text);
    alert("Output copied to clipboard!");
  };

  return (
    <div className="min-h-[90vh] bg-gray-50 flex flex-col items-center  p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6 mt-12 text-center">JSON PARSER</h1>

      {/* Editors & Button */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-6xl flex-1">
        {/* Input Editor */}
        <div className="w-full md:w-[45%] flex flex-col h-[70vh]">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Input JSON</h2>
          <CodeMirrorEditor value={inputJSON} onChange={setInputJSON} />
        </div>

        {/* Center Parse Button */}
        <div className="flex justify-center items-center md:h-[70vh]">
          <button
            onClick={handleParseJSON}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Parse JSON
          </button>
        </div>

        {/* Output Editor */}
        <div className="w-full md:w-[45%] flex flex-col h-[70vh]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Parsed Output</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("code")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "code" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setViewMode("tree")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "tree" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Tree
              </button>
              <button
                onClick={() => setViewMode("text")}
                className={`px-2 py-1 rounded-md ${
                  viewMode === "text" ? "bg-blue-600 text-white" : "bg-gray-200"
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
            {outputJSON === null ? (
              <span className="text-gray-500 p-2">Output will appear here</span>
            ) : viewMode === "code" || viewMode === "text" ? (
              <CodeMirrorEditor value={JSON.stringify(outputJSON, null, 2)} readOnly={true} />
            ) : viewMode === "tree" ? (
              <JsonTreeCollapsible data={outputJSON} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
