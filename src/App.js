// src/App.js
import React, { useState, useEffect } from "react";
import RequirementInput from "./components/RequirementInput";
import GeneratedCodeView from "./components/GeneratedCodeView";
import TestResults from "./components/TestResults";
import Page1 from "./components/Page1";
import newdas from "./newdas.png";

function App() {
  const [generatedCode, setGeneratedCode] = useState("");
  useEffect(() => {
    // Change the browser tab title when the app is loaded
    document.title = "ADAS AI FCW"; // Change it to your desired title
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      <aside className="w-1/4 bg-blue-700 text-white p-5">
        <img src={newdas} />
        <h1 className="text-2xl font-bold mb-4">GenAI ADAS Platform</h1>
        <nav className="space-y-2">
          <a
            href="#requirements"
            className="block py-2 px-3 rounded hover:bg-blue-600"
          >
            Input Requirements
          </a>
          <a
            href="#generated-code"
            className="block py-2 px-3 rounded hover:bg-blue-600"
          >
            Generated Code
          </a>
          <a
            href="#test-results"
            className="block py-2 px-3 rounded hover:bg-blue-600"
          >
            Test Results
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6 pb-6">
        {/* <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
        <div id="requirements" className="mb-10">
          <RequirementInput setGeneratedCode={setGeneratedCode} />
        </div>
        <div id="generated-code" className="mb-10">
          <GeneratedCodeView generatedCode={generatedCode} />
        </div>
        <div id="test-results" className="mb-10">
          <TestResults />
        </div> */}
        <Page1 />
      </main>
    </div>
  );
}

export default App;
