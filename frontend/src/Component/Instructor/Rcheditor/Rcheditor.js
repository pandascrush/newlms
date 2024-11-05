// import React, { useState, useRef, useCallback } from 'react';
// import JoditEditor from 'jodit-react';

// const EditorComponent = () => {
//   const [content, setContent] = useState('');
// //   const editorRef = useRef(null);

//   const handleEditorChange = useCallback((newContent) => {
//     console.log('Editor content changed:', newContent); // Log content changes for debugging
//     setContent(newContent);
//   }, []);

//   return (
//     <div className="editor-container">
//       <JoditEditor
//         // ref={editorRef}
//         value={content}
//         config={{
//           readonly: false, // Set to true to make editor read-only
//           toolbar: true,   // Show the toolbar
//         }}
//         onClick={handleEditorChange}
//       />
//       <div>
//         {/* <button onClick={func()}>ok</button> */}
//         <h3>Editor Content:</h3>
//         <div 
//           dangerouslySetInnerHTML={{ __html: content }} 
//           style={{ border: '1px solid #ddd', padding: '10px', minHeight: '100px' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditorComponent;



import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const EditorComponent = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef(null); // Reference to the editor instance

  // Handle editor content changes
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  // Handle button click to display editor content
  const handleButtonClick = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current;
      const currentContent = editorInstance.value; // Get the current content from the editor
      setContent(currentContent);
    }
  };

  return (
    <div className="editor-container">
      <JoditEditor
        ref={editorRef}
        value={content}
        config={{
          readonly: false, 
          toolbar: true,   
        }}
        onFocus={handleEditorChange}/>
      <div>
        <button onClick={handleButtonClick}>Show Content</button>
        <h3>Editor Content:</h3>
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          style={{ border: '1px solid #ddd', padding: '10px', minHeight: '100px' }}
        />
      </div>
    </div>
  );
};

export default EditorComponent;


// import React, { useState, useRef } from 'react';
// import JoditEditor from 'jodit-react';

// const Question = () => {
//   const [content, setContent] = useState(''); // State for question content
//   const [questionType, setQuestionType] = useState('multiple choice'); // State for question type
//   const [correctOption, setCorrectOption] = useState(''); // State for selected correct option
//   const [options, setOptions] = useState(['', '', '', '']); // State for multiple choice options
//   const [keywords, setKeywords] = useState([{ keyword: '', marks: '' }]); // State for keywords and marks
//   const editorRef = useRef(null);

//   // Handle editor content changes
//   const handleEditorChange = (newContent) => {
//     setContent(newContent);
//   };

//   // Handle button click to display editor content
//   const handleButtonClick = () => {
//     if (editorRef.current) {
//       const editorInstance = editorRef.current;
//       const currentContent = editorInstance.value;
//       setContent(currentContent);
//     }
//   };

//   // Handle dropdown change for question type
//   const handleQuestionTypeChange = (event) => {
//     setQuestionType(event.target.value);
//     setCorrectOption(''); // Reset correct option when changing question type
//   };

//   // Handle correct option selection change
//   const handleCorrectOptionChange = (e) => {
//     setCorrectOption(e.target.value);
//   };

//   // Handle input change for multiple choice options
//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   // Handle keyword and marks changes
//   const handleKeywordChange = (index, field, value) => {
//     const newKeywords = [...keywords];
//     newKeywords[index] = { ...newKeywords[index], [field]: value };
//     setKeywords(newKeywords);
//   };

//   // Add a new keyword input
//   const addKeyword = () => {
//     setKeywords([...keywords, { keyword: '', marks: '' }]);
//   };

//   // Remove a keyword input
//   const removeKeyword = (index) => {
//     setKeywords(keywords.filter((_, i) => i !== index));
//   };

//   return (
    
//     <div className="editor-container" style={{ textAlign: 'left' }}>
//       <div className="question-type-dropdown" style={{ marginBottom: '10px' }}>
//         <label htmlFor="questionType">Select Question Type:</label>
//         <select
//           id="questionType"
//           value={questionType}
//           onChange={handleQuestionTypeChange}
//           style={{ marginLeft: '10px' }}
//         >
//           <option value="multiple choice">Multiple Choice</option>
//           <option value="description">Description</option>
//           <option value="true/false">True/False</option>
//         </select>
//       </div>

//       {/* Question Input Area */}
//       <JoditEditor
//         ref={editorRef}
//         value={content}
//         config={{
//           readonly: false,
//           toolbar: true,
//         }}
//         onBlur={handleEditorChange} />

//       {/* Conditionally render True/False options */}
//       {questionType === 'true/false' && (
//         <div className="true-false-options" style={{ marginTop: '10px' }}>
//             <div className='d-flex justify-content-around'>
//           <div>
//             <label>
//               <input type="radio" name="trueFalseOption" value="true" disabled />
//               True
//             </label>
//           </div>
//           <div>
//             <label>
//               <input type="radio" name="trueFalseOption" value="false" disabled />
//               False
//             </label>
//           </div>
//           </div>
//           <div style={{ marginTop: '10px', marginBottom: '10px' }}>
//             <label>Correct Option:</label>
//             <select
//               value={correctOption}
//               onChange={handleCorrectOptionChange}
//               style={{ marginLeft: '10px' }}
//             >
//               <option value="">Select Correct Option</option>
//               <option value="true">True</option>
//               <option value="false">False</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Conditionally render Multiple Choice inputs */}
//       {questionType === 'multiple choice' && (
//         <div style={{ marginTop: '10px' }}>
//           {options.map((option, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//               <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
//               <input
//                 type="text"
//                 id={`option${index + 1}`}
//                 placeholder={`Option ${index + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//             </div>
//           ))}
//           <div style={{ marginBottom: '10px' }}>
//             <label>Correct Option:</label>
//             <select
//               value={correctOption}
//               onChange={handleCorrectOptionChange}
//               style={{ marginLeft: '10px' }}
//             >
//               <option value="">Select Correct Option</option>
//               {options.map((option, index) => (
//                 <option key={index} value={option}>
//                   Option {index + 1}: {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Conditionally render Description inputs */}
//       {questionType === 'description' && (
//         <div className="description" style={{ marginTop: '10px' }}>
//           {keywords.map((keyword, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//               <label htmlFor={`keyword${index}`}>Keyword {index + 1}:</label>
//               <input
//                 type="text"
//                 id={`keyword${index}`}
//                 placeholder="Enter the keyword"
//                 value={keyword.keyword}
//                 onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//               <label htmlFor={`marks${index}`} style={{ marginLeft: '20px' }}>Marks:</label>
//               <input
//                 type="number"
//                 id={`marks${index}`}
//                 placeholder="Enter marks"
//                 value={keyword.marks}
//                 onChange={(e) => handleKeywordChange(index, 'marks', e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               />
//               <button
//                 type="button"
//                 onClick={() => removeKeyword(index)}
//                 style={{ marginLeft: '10px' }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addKeyword} style={{ marginTop: '10px' }}>
//             Add Keyword
//           </button>
//         </div>
//       )}

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={handleButtonClick}>Show Content</button>
//         <button type="submit" style={{ marginLeft: '10px' }}>
//           Submit
//         </button>
//         <h3>Editor Content:</h3>
//         <div
//           dangerouslySetInnerHTML={{ __html: content }}
//           style={{ border: '1px solid #ddd', padding: '10px', minHeight: '100px' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Question;
