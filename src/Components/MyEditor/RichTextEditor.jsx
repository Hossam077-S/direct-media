import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import EditorToolbar from "./EditorToolbar";
import useStyles from "./styles";

// Image component
const ImageComponent = (props) => {
  const { src, width, height, alignment } = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData();
  return (
    <div style={{ textAlign: alignment || "left" }}>
      <img src={src} width={width || "auto"} height={height || "auto"} alt="" />
    </div>
  );
};

// Link component
const LinkComponent = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: "blue", textDecoration: "underline" }}>
      {props.children}
    </a>
  );
};

// Strategy to find link entities
const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

function RichTextEditor() {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(
      new CompositeDecorator([
        {
          strategy: findLinkEntities,
          component: LinkComponent,
        },
      ])
    )
  );

  const editorRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const blockRendererFn = (block) => {
    console.log(block.getType());

    if (block.getType() === "atomic") {
      const entityKey = block.getEntityAt(0);
      if (entityKey) {
        const entity = editorState.getCurrentContent().getEntity(entityKey);
        if (entity.getType() === "IMAGE") {
          return {
            component: ImageComponent,
            editable: false,
          };
        }
      }
    }
    return null;
  };

  const blockStyleFn = (block) => {
    switch (block.getType()) {
      case "align-left":
        return classes["align-left"];
      case "align-center":
        return classes["align-center"];
      case "align-right":
        return classes["align-right"];
      default:
        return null;
    }
  };

  const addImage = (file, width, height) => {
    const reader = new FileReader();
    reader.onload = () => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "IMAGE",
        "IMMUTABLE",
        { src: reader.result, width, height, alignment: "left" }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
      );
    };
    reader.readAsDataURL(file);
  };

  // Convert ContentState to a raw JavaScript object
  const getContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState); // Convert to raw JS object
    console.log("Raw Content State:", rawContentState); // Now you can see the object structure in detail

    const html = draftToHtml(rawContentState); // Convert raw content to HTML
    setHtmlContent(html);
    return html;
  };

  const handleSubmit = () => {
    console.log("Submit button clicked");
    const html = getContent(); // Get the latest content directly
    console.log("HTML Content:", html); // Use the content generated in getContent
    alert("Editor Content:\n\n" + html);
  };

  return (
    <div className={classes.container}>
      <EditorToolbar
        editorState={editorState}
        onChange={handleEditorChange}
        onAddImage={addImage}
      />
      <div className={classes.editor} onClick={() => editorRef.current.focus()}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRendererFn}
          blockStyleFn={blockStyleFn}
          placeholder="أكتب..."
          ref={editorRef}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div className="output">
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}

export default RichTextEditor;
