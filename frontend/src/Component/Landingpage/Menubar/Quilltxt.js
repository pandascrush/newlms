



// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import axios from 'axios';

// // Custom toolbar component
// const CustomToolbar = () => (
//   <div id="toolbar">
//     <span className="ql-formats">
//       <button className="ql-bold">B</button>
//       <button className="ql-italic">I</button>
//       <button className="ql-underline">U</button>
//       <button className="ql-strike">S</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-list" value="ordered">Ordered List</button>
//       <button className="ql-list" value="bullet">Bullet List</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-align" value="">Left</button>
//       <button className="ql-align" value="center">Center</button>
//       <button className="ql-align" value="right">Right</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-link">Link</button>
//       <button className="ql-image">Image</button>
//     </span>
//     <span className="ql-formats">
//       <select className="ql-header" defaultValue="">
//         <option value="">Normal</option>
//         <option value="1">Heading 1</option>
//         <option value="2">Heading 2</option>
//         <option value="3">Heading 3</option>
//         <option value="4">Heading 4</option>
//         <option value="5">Heading 5</option>
//         <option value="6">Heading 6</option>
//       </select>
//     </span>
//   </div>
// );

// const RichTextEditor = () => {
//   const [editorContent, setEditorContent] = useState('');
//   const quillRef = useRef(null);

//   const handleEditorChange = (content) => {
//     setEditorContent(content);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         if (range) {
//           quill.insertEmbed(range.index, 'image', reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const saveContent = () => {
//     axios.post('${process.env.REACT_APP_API_URL}/save', { content: editorContent })
//       .then(response => {
//         console.log('Content saved:', response.data.message);
//       })
//       .catch(error => {
//         console.error('Error saving content:', error);
//       });
//   };

//   return (
//     <div>
//       <CustomToolbar />
//       <ReactQuill
//         ref={quillRef}
//         value={editorContent}
//         onChange={handleEditorChange}
//         modules={RichTextEditor.modules}
//         formats={RichTextEditor.formats}
//         placeholder="Start typing here..."
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         style={{ marginTop: '10px' }}
//       />
//       <button onClick={saveContent} style={{ marginTop: '10px' }}>Save Content</button>
//       <div className="saved-content">
//         <h2>Saved Content</h2>
//         <div dangerouslySetInnerHTML={{ __html: editorContent }}></div>
//       </div>
//     </div>
//   );
// };

// // Define Quill modules
// RichTextEditor.modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       'image': function () {
//         document.querySelector('input[type="file"]').click();
//       }
//     }
//   },
// };

// // Define allowed formats
// RichTextEditor.formats = [
//   'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
//   'list', 'bullet', 'align', 'link', 'image',
// ];

// export default RichTextEditor;





// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// const CustomToolbar = () => (
//   <div id="toolbar">
//     <span className="ql-formats">
//       <button className="ql-bold">B</button>
//       <button className="ql-italic">I</button>
//       <button className="ql-underline">U</button>
//       <button className="ql-strike">S</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-list" value="ordered">Ordered List</button>
//       <button className="ql-list" value="bullet">Bullet List</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-align" value="">Left</button>
//       <button className="ql-align" value="center">Center</button>
//       <button className="ql-align" value="right">Right</button>
//     </span>
//     <span className="ql-formats">
//       <button className="ql-link">Link</button>
//       <button className="ql-image">Image</button>
//     </span>
//     <span className="ql-formats">
//       <select className="ql-header" defaultValue="">
//         <option value="">Normal</option>
//         <option value="1">Heading 1</option>
//         <option value="2">Heading 2</option>
//         <option value="3">Heading 3</option>
//         <option value="4">Heading 4</option>
//         <option value="5">Heading 5</option>
//         <option value="6">Heading 6</option>
//       </select>
//     </span>
//   </div>
// );

// const Mcq = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [correctOption, setCorrectOption] = useState('');
//   const quillRef = useRef(null);

//   const handleQuestionChange = (content) => {
//     setNewQuestion(content);
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleCorrectOptionChange = (index) => {
//     setCorrectOption(index);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const question = {
//       question: newQuestion,
//       options: options,
//       correctOption: correctOption,
//     };
//     setQuestions([...questions, question]);
//     setNewQuestion('');
//     setOptions(['', '', '', '']);
//     setCorrectOption('');
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       json.forEach((row, index) => {
//         if (index === 0) return; 
//         const question = {
//           question: row[0],
//           options: [row[1], row[2], row[3], row[4]],
//           correctOption: row[5],
//         };
//         setQuestions((prevQuestions) => [...prevQuestions, question]);
//       });
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const saveContent = () => {
//     axios.post('${process.env.REACT_APP_API_URL}/save', { content: newQuestion })
//       .then(response => {
//         console.log('Content saved:', response.data.message);
//       })
//       .catch(error => {
//         console.error('Error saving content:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className='row'>
//         <div className='col'>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Question</label>
//               <CustomToolbar />
//               <ReactQuill
//                 ref={quillRef}
//                 value={newQuestion}
//                 onChange={handleQuestionChange}
//                 modules={Mcq.modules}
//                 formats={Mcq.formats}
//                 placeholder="Type the question here..."
//               />
//             </div>
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
//                   />
//                   <div className="form-check">
//                     <input
//                       type="radio"
//                       className="form-check-input"
//                       name="correctOption"
//                       checked={correctOption === index}
//                       onChange={() => handleCorrectOptionChange(index)}
//                     />
//                     <label className="form-check-label">Correct</label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="btn btn-primary">Add Question</button>
//           </form>
//           <div className="mt-4">
//             <h3>Questions List</h3>
//             <ul className="list-group">
//               {questions.map((question, index) => (
//                 <li key={index} className="list-group-item">
//                   <strong dangerouslySetInnerHTML={{ __html: question.question }} />
//                   <ul>
//                     {question.options.map((option, optIndex) => (
//                       <li key={optIndex}>
//                         <span>{option}</span>
//                         {optIndex === question.correctOption ? ' (Correct)' : ''}
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className='col'>
//           <h6>Choose File from your Device</h6>
//           <div className='uploadim mt-2 p-4'>
//             {/* <img src={uploadim} style={{height:'90px'}} className='impart'/> */}
//             <p>Upload the file</p>
//             <input type='file' className='d-block mt-2' accept='.xls, .xlsx' onChange={handleFileUpload} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Define Quill modules
// Mcq.modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       'image': function () {
//         document.querySelector('input[type="file"]').click();
//       }
//     }
//   },
// };

// // Define allowed formats
// Mcq.formats = [
//   'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
//   'list', 'bullet', 'align', 'link', 'image',
// ];

// export default Mcq;




import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';
import "./Quilltxt.css";
import * as XLSX from 'xlsx';
import uploadim from "../../Asset/6324.jpg";

// Custom toolbar component
const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold">B</button>
      <button className="ql-italic">I</button>
      <button className="ql-underline">U</button>
      <button className="ql-strike">S</button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered">Ordered List</button>
      <button className="ql-list" value="bullet">Bullet List</button>
    </span>
    <span className="ql-formats">
      <button className="ql-align" value="">Left</button>
      <button className="ql-align" value="center">Center</button>
      <button className="ql-align" value="right">Right</button>
    </span>
    <span className="ql-formats">
    <button className="ql-image">Image</button>
      <button className="ql-link">Link</button>
    </span>
  </div>
);

const RichTextEditor = ({ editorContent, handleEditorChange, quillRef }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, 'image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={handleEditorChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Start typing here..."
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

// Define Quill modules
RichTextEditor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      'image': function () {
        document.querySelector('input[type="file"]').click();
      }
    }
  },
};

// Define allowed formats
RichTextEditor.formats = [
  'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'align', 'link', 'image',
];

const Quilltxt = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const quillRef = useRef(null);

  const handleEditorChange = (content) => {
    setNewQuestion(content);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      question: newQuestion,
      options: options,
      correctOption: correctOption,
    };
    setQuestions([...questions, question]);
    setNewQuestion('');
    setOptions(['', '', '', '']);
    setCorrectOption('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      json.forEach((row, index) => {
        if (index === 0) return; 
        const question = {
          question: row[0],
          options: [row[1], row[2], row[3], row[4]],
          correctOption: row[5],
        };
        setQuestions((prevQuestions) => [...prevQuestions, question]);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container">
      <div className='row'>
        <div className='col'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question</label>
              <RichTextEditor
                editorContent={newQuestion}
                handleEditorChange={handleEditorChange}
                quillRef={quillRef}
              />
            </div>
            <div className="form-group">
              {options.map((option, index) => (
                <div key={index} className="form-group">
                  <label>Option {index + 1}</label>
                  <input type="text" className="form-control" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} required />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Correct Option</label>
              <select className="form-control" value={correctOption} onChange={handleCorrectOptionChange} required>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    Option {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Question</button>
          </form>
          <div className="mt-4">
            <h3>Questions List</h3>
            <ul className="list-group">
              {questions.map((question, index) => (
                <li key={index} className="list-group-item">
                  <strong dangerouslySetInnerHTML={{ __html: question.question }}></strong>
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option} {option === question.correctOption ? '(Correct)' : ''}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col'>
          <h6>Choose File from your Device</h6>
          <div className='uploadim mt-2 p-4'>
            <img src={uploadim} style={{height:'90px'}} className='impart'/>
            <p>Upload the file</p>
            <input type='file' className='d-block mt-2' accept='.xls, .xlsx' onChange={handleFileUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quilltxt;
