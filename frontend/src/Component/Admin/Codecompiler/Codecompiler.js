import React, { useState } from 'react';
import './Codecompiler.css'; 

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRunCode = () => {
    const originalConsoleLog = console.log;
    const logs = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
    };

    try {
      new Function(code)();
    } catch (err) {
      setError('Error: ' + err.message);
      setOutput('');
    } finally {
      console.log = originalConsoleLog;
      setOutput(logs.join('\n'));
    }
  };

  return (
    <div className="editor-container">
      <h2>JavaScript Code Editor</h2>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Write your JavaScript code here..."
      />
      <button className="run-button" onClick={handleRunCode}>Run Code</button>
      {error && <div className="error">{error}</div>}
      <pre className="output">{output}</pre>
    </div>
  );
}

export default CodeEditor;
