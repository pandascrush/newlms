

// import React, { useState } from 'react';
// import { EditorState } from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
// import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
// import '@draft-js-plugins/static-toolbar/lib/plugin.css'; // Static toolbar plugin CSS
// import './styles.css';

// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   CodeButton,
// } from '@draft-js-plugins/buttons'; // Import buttons

// const toolbarPlugin = createToolbarPlugin();
// const { Toolbar } = toolbarPlugin;
// const plugins = [toolbarPlugin];

// const RichTextEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const handleEditorChange = (state) => {
//     setEditorState(state);
//   };

//   return (
//     <div>
//       <div className="toolbar-container">
//         <Toolbar>
//           {(externalProps) => (
//             <div>
//               <BoldButton {...externalProps} />
//               <ItalicButton {...externalProps} />
//               <UnderlineButton {...externalProps} />
//               <CodeButton {...externalProps} />
//             </div>
//           )}
//         </Toolbar>
//       </div>
//       <div className="editor-container">
//         <Editor
//           editorState={editorState}
//           onChange={handleEditorChange}
//           plugins={plugins}
//           placeholder="Start typing here..."
//         />
//       </div>
//     </div>
//   );
// };

// export default RichTextEditor;

import React, { useState } from 'react';
import { EditorState, Modifier, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './styles.css';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
} from '@draft-js-plugins/buttons';

// Create a toolbar plugin instance
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

const insertImage = (editorState, file) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: URL.createObjectURL(file) });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

  return newEditorState;
};

const RichTextEditorql = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newEditorState = insertImage(editorState, file);
      setEditorState(newEditorState);
    }
  };

  return (
    <div>
      <div className="toolbar-container">
        <Toolbar>
          {(externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginLeft: '10px' }}
              />
            </div>
          )}
        </Toolbar>
      </div>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
};

export default RichTextEditorql;
