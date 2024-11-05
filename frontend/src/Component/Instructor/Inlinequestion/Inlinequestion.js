import React, { useState } from 'react';
import axios from 'axios';
// import './CodeCompiler.css'; // Create a CSS file to style the component as needed

const languages = [
  { name: 'C', version: '5' },
  { name: 'C++', version: '5' },
  { name: 'Java', version: '10' },
  { name: 'Python', version: '3' },
  { name: 'JavaScript', version: '4' },
  { name: 'PHP', version: '8' },
  // Add other languages and versions supported by JDoodle or your chosen service
];

function AdminCodingQuestion() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(languages[0].name);
  const [version, setVersion] = useState(languages[0].version);

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(lang => lang.name === e.target.value);
    setLanguage(selectedLanguage.name);
    setVersion(selectedLanguage.version);
  };

  const handleCompile = async () => {
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your JDoodle client ID
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Replace with your JDoodle client secret

    const program = {
      script: code,
      language: language.toLowerCase(),
      versionIndex: version,
      clientId: clientId,
      clientSecret: clientSecret
    };

    try {
      const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
      setOutput(response.data.output);
    } catch (error) {
      console.error('There was an error executing the code:', error);
      setOutput('Error executing code');
    }
  };

  return (
    <div className="compiler-container">
      <h2>Live Code Compiler</h2>
      <div className="controls">
        <select value={language} onChange={handleLanguageChange}>
          {languages.map(lang => (
            <option key={lang.name} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Write your code here..."
      />
      <button className="compile-button" onClick={handleCompile}>Compile and Run</button>
      <pre className="output">{output}</pre>
    </div>
  );
}

export default AdminCodingQuestion;

