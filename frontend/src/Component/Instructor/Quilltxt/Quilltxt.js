// // import React, { useState, useRef, useCallback } from 'react';
// // import JoditEditor from 'jodit-react';

// // const Quilltxt = () => {
// //   const [content, setContent] = useState('');
// //   const [questions, setQuestions] = useState([]);
// //   const [newQuestion, setNewQuestion] = useState('');
// //   const [options, setOptions] = useState(['', '', '', '']);
// //   const [correctOption, setCorrectOption] = useState('');
// //   const [questionType, setQuestionType] = useState('MCQ');
// //   const [description, setDescription] = useState('');
// //   const editorRef = useRef(null);

// //   const handleEditorChange = useCallback((newContent) => {
// //     setContent(newContent);
// //   }, []);

// //   const handleOptionChange = (index, value) => {
// //     const newOptions = [...options];
// //     newOptions[index] = value;
// //     setOptions(newOptions);
// //   };

// //   const handleCorrectOptionChange = (e) => {
// //     setCorrectOption(e.target.value);
// //   };

// //   const handleQuestionTypeChange = (e) => {
// //     const selectedType = e.target.value;
// //     setQuestionType(selectedType);
// //     if (selectedType === 'True/False') {
// //       setOptions(['True', 'False']);
// //       setCorrectOption('');
// //     } else if (selectedType === 'Description') {
// //       setOptions([]); 
// //       setCorrectOption('');
// //       setDescription(''); 
// //     } else {
// //       setOptions(['', '', '', '']);
// //     }
// //   };

// //   const handleDescriptionChange = (e) => {
// //     setDescription(e.target.value);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!newQuestion.trim()) {
// //       alert('Question cannot be empty!');
// //       return;
// //     }

// //     if (questionType === 'MCQ' && options.some(option => !option.trim())) {
// //       alert('All options must be filled!');
// //       return;
// //     }

// //     if (questionType === 'MCQ' && !correctOption.trim()) {
// //       alert('Correct option must be selected!');
// //       return;
// //     }

// //     const question = {
// //       question: newQuestion,
// //       options: questionType === 'Description' ? [] : options,
// //       correctOption: questionType === 'Description' ? description : correctOption,
// //       questionType: questionType,
// //       description: questionType === 'Description' ? description : '',
// //     };

// //     console.log(question);
// //     setQuestions([...questions, question]);
// //     setNewQuestion('');
// //     setOptions(questionType === 'MCQ' ? ['', '', '', ''] : ['True', 'False']);
// //     setCorrectOption('');
// //     setDescription('');
// //   };

// //   return (
// //     <div className="container">
// //       <div className='row'>
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-group">
// //             <label>Question Type</label>
// //             <select className="form-control" value={questionType} onChange={handleQuestionTypeChange} required>
// //               <option value="MCQ">MCQ</option>
// //               <option value="True/False">True/False</option>
// //               <option value="Description">Description</option>
// //             </select>
// //           </div>
// //           <div className="form-group">
// //             <label>Question</label>
// //             <JoditEditor
// //               ref={editorRef}
// //               value={content}
// //               config={{
// //                 readonly: false,
// //                 toolbar: true,
// //               }}
// //               onChange={handleEditorChange}
// //             />
// //           </div>
// //           {questionType !== 'Description' && (
// //             <div className="form-group">
// //               {options.map((option, index) => (
// //                 <div key={index} className="form-group">
// //                   <label>Option {index + 1}</label>
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     value={option}
// //                     onChange={(e) => handleOptionChange(index, e.target.value)}
// //                     required
// //                     disabled={questionType === 'True/False'}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //           {questionType === 'Description' && (
// //             <div className="form-group">
// //               <label>Description</label>
// //               <textarea
// //                 className="form-control"
// //                 value={description}
// //                 onChange={handleDescriptionChange}
// //                 rows="4"
// //                 required
// //               />
// //             </div>
// //           )}
// //           {questionType !== 'Description' && (
// //             <div className="form-group">
// //               <label>Correct Option</label>
// //               <select className="form-control" value={correctOption} onChange={handleCorrectOptionChange} required>
// //                 {options.map((option, index) => (
// //                   <option key={index} value={option}>
// //                     Option {index + 1}: {option}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}
// //           <button type="submit" className="btn btn-primary">Add Question</button>
// //         </form>
// //         <div className="mt-4">
// //           <h3>Questions List</h3>
// //           <ul className="list-group">
// //             {questions.map((question, index) => (
// //               <li key={index} className="list-group-item">
// //                 <strong dangerouslySetInnerHTML={{ __html: question.question }}></strong>
// //                 {questionType === 'Description' ? (
// //                   <p>{question.description}</p>
// //                 ) : (
// //                   <ul>
// //                     {question.options.map((option, optIndex) => (
// //                       <li key={optIndex}>{option} {option === question.correctOption ? '(Correct)' : ''}</li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Quilltxt;




import React, { useState, useRef, useCallback } from 'react';
import JoditEditor from 'jodit-react';

const Quilltxt = () => {
  const [content, setContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState([{ keyword: '', marks: '' }]);
  const editorRef = useRef(null);

  const handleEditorChange = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    const selectedType = e.target.value;
    setQuestionType(selectedType);
    if (selectedType === 'True/False') {
      setOptions(['True', 'False']);
      setCorrectOption('');
    } else if (selectedType === 'Description') {
      setOptions([]);
      setCorrectOption('');
      setDescription('');
      setKeywords([{ keyword: '', marks: '' }]);
    } else {
      setOptions(['', '', '', '']);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeywordChange = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index][field] = value;
    setKeywords(newKeywords);
  };

  const handleAddKeyword = () => {
    setKeywords([...keywords, { keyword: '', marks: '' }]);
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!newQuestion.trim()) {
    //   alert('Question cannot be empty!');
    //   return;
    // }

    if (questionType === 'MCQ' && options.some(option => !option.trim())) {
      alert('All options must be filled!');
      return;
    }

    if (questionType === 'MCQ' && !correctOption.trim()) {
      alert('Correct option must be selected!');
      return;
    }

    const question = {
      question: newQuestion,
      options: questionType === 'Description' ? [] : options,
      correctOption: questionType === 'Description' ? description : correctOption,
      questionType: questionType,
      description: questionType === 'Description' ? description : '',
      keywords: questionType === 'Description' ? keywords : [],
    };

    console.log(question);
    setQuestions([...questions, question]);
    setNewQuestion('');
    setOptions(questionType === 'MCQ' ? ['', '', '', ''] : ['True', 'False']);
    setCorrectOption('');
    setDescription('');
    setKeywords([{ keyword: '', marks: '' }]);
  };

  return (
    <div className="container">
      <div className='row'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question Type</label>
            <select className="form-control" value={questionType} onChange={handleQuestionTypeChange} required>
              <option value="MCQ">MCQ</option>
              <option value="True/False">True/False</option>
              <option value="Description">Description</option>
            </select>
          </div>
          <div className="form-group">
            <label>Question</label>
            <JoditEditor
              ref={editorRef}
              value={content}
              config={{
                readonly: false,
                toolbar: true,
              }}
              onFocus={handleEditorChange}
            />
          </div>
          {questionType !== 'Description' && (
            <div className="form-group">
              {options.map((option, index) => (
                <div key={index} className="form-group">
                  <label>Option {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    disabled={questionType === 'True/False'}
                  />
                </div>
              ))}
            </div>
          )}
          {questionType === 'Description' && (
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
                rows="4"
                required
              />
              <div className="mt-3">
                <label>Keywords</label>
                {keywords.map((keyword, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="Keyword"
                      value={keyword.keyword}
                      onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      className="form-control mr-2"
                      placeholder="Marks"
                      value={keyword.marks}
                      onChange={(e) => handleKeywordChange(index, 'marks', e.target.value)}
                      required
                    />
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveKeyword(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddKeyword}>Add Keyword</button>
              </div>
            </div>
          )}
          {questionType !== 'Description' && (
            <div className="form-group">
              <label>Correct Option</label>
              <select className="form-control" value={correctOption} onChange={handleCorrectOptionChange} required>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    Option {index + 1}: {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-primary">Add Question</button>
        </form>
        <div className="mt-4">
          <h3>Questions List</h3>
          <ul className="list-group">
            {questions.map((question, index) => (
              <li key={index} className="list-group-item">
                <strong dangerouslySetInnerHTML={{ __html: question.question }}></strong>
                {questionType === 'Description' ? (
                  <div>
                    {/* <p>{question.description}</p> */}
                    <ul>
                      {question.keywords.map((keyword, i) => (
                        <li key={i}>
                          {keyword.keyword}: {keyword.marks} marks
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option} {option === question.correctOption ? '(Correct)' : ''}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quilltxt;




// import React, { useState, useRef, useCallback } from 'react';
// import JoditEditor from 'jodit-react';

// const Quilltxt = () => {
//   const [content, setContent] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [correctOption, setCorrectOption] = useState('');
//   const [questionType, setQuestionType] = useState('MCQ');
//   const [description, setDescription] = useState('');
//   const [keywords, setKeywords] = useState([{ keyword: '', marks: '' }]);
//   const editorRef = useRef(null);

//   const handleEditorChange = useCallback((newContent) => {
//     setContent(newContent);
//   }, []);

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleCorrectOptionChange = (e) => {
//     setCorrectOption(e.target.value);
//   };

//   const handleQuestionTypeChange = (e) => {
//     const selectedType = e.target.value;
//     setQuestionType(selectedType);
//     if (selectedType === 'True/False') {
//       setOptions(['True', 'False']);
//       setCorrectOption('');
//     } else if (selectedType === 'Description') {
//       setOptions([]);
//       setCorrectOption('');
//       setDescription('');
//       setKeywords([{ keyword: '', marks: '' }]);
//     } else {
//       setOptions(['', '', '', '']);
//     }
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleKeywordChange = (index, field, value) => {
//     const newKeywords = [...keywords];
//     newKeywords[index][field] = value;
//     setKeywords(newKeywords);
//   };

//   const handleAddKeyword = () => {
//     setKeywords([...keywords, { keyword: '', marks: '' }]);
//   };

//   const handleRemoveKeyword = (index) => {
//     const newKeywords = keywords.filter((_, i) => i !== index);
//     setKeywords(newKeywords);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (!content.trim()) {
//     //   alert('Question cannot be empty!');
//     //   return;
//     // }
//     if (content.length < 1) {
//       alert('Question cannot be empty!');
//       return;
//   } 

//     if (questionType === 'MCQ' && options.some(option => !option.trim())) {
//       alert('All options must be filled!');
//       return;
//     }

//     if (questionType === 'MCQ' && !correctOption.trim()) {
//       alert('Correct option must be selected!');
//       return;
//     }

//     const question = {
//       question: content,
//       options: questionType === 'Description' ? [] : options,
//       correctOption: questionType === 'Description' ? description : correctOption,
//       questionType: questionType,
//       description: questionType === 'Description' ? description : '',
//       keywords: questionType === 'Description' ? keywords : [],
//     };

//     console.log(question);
//     setQuestions([...questions, question]);
//     setContent(''); // Clear the content
//     setOptions(questionType === 'MCQ' ? ['', '', '', ''] : ['True', 'False']);
//     setCorrectOption('');
//     setDescription('');
//     setKeywords([{ keyword: '', marks: '' }]);
//   };

//   return (
//     <div className="container">
//       <div className='row'>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Question Type</label>
//             <select className="form-control" value={questionType} onChange={handleQuestionTypeChange} required>
//               <option value="MCQ">MCQ</option>
//               <option value="True/False">True/False</option>
//               <option value="Description">Description</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Question</label>
//             <JoditEditor
//               ref={editorRef}
//               value={content}
//               config={{
//                 readonly: false,
//                 toolbar: true,
//               }}
//               onChange={handleEditorChange}
//             />
//           </div>
//           {questionType !== 'Description' && (
//             <div className="form-group">
//               {options.map((option, index) => (
//                 <div key={index} className="form-group">
//                   <label>Option {index + 1}</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                     required
//                     disabled={questionType === 'True/False'}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//           {questionType === 'Description' && (
//             <div className="form-group">
//               <div className="mt-3">
//                 <label>Keywords</label>
//                 {keywords.map((keyword, index) => (
//                   <div key={index} className="d-flex mb-2">
//                     <input
//                       type="text"
//                       className="form-control mr-2"
//                       placeholder="Keyword"
//                       value={keyword.keyword}
//                       onChange={(e) => handleKeywordChange(index, 'keyword', e.target.value)}
//                       required
//                     />
//                     <input
//                       type="number"
//                       className="form-control mr-2"
//                       placeholder="Marks"
//                       value={keyword.marks}
//                       onChange={(e) => handleKeywordChange(index, 'marks', e.target.value)}
//                       required
//                     />
//                     <button type="button" className="btn btn-danger" onClick={() => handleRemoveKeyword(index)}>Remove</button>
//                   </div>
//                 ))}
//                 <button type="button" className="btn btn-secondary" onClick={handleAddKeyword}>Add Keyword</button>
//               </div>
//             </div>
//           )}
//           {questionType !== 'Description' && (
//             <div className="form-group">
//               <label>Correct Option</label>
//               <select className="form-control" value={correctOption} onChange={handleCorrectOptionChange} required>
//                 {options.map((option, index) => (
//                   <option key={index} value={option}>
//                     Option {index + 1}: {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <button type="submit" className="btn btn-primary">Add Question</button>
//         </form>
//         <div className="mt-4">
//           <h3>Questions List</h3>
//           <ul className="list-group">
//             {questions.map((question, index) => (
//               <li key={index} className="list-group-item">
//                 <strong dangerouslySetInnerHTML={{ __html: question.question }}></strong>
//                 {questionType === 'Description' ? (
//                   <div>
//                     {/* <p>{question.description}</p> */}
//                   </div>
//                 ) : (
//                   <ul>
//                     {question.options.map((option, optIndex) => (
//                       <li key={optIndex}>{option} {option === question.correctOption ? '(Correct)' : ''}</li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quilltxt;
