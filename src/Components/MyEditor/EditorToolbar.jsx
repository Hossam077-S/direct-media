import React from "react";
import { RichUtils } from "draft-js";

// Define maximum width and height values in pixels
const MAX_WIDTH = 800; // Adjust as needed
const MAX_HEIGHT = 600; // Adjust as needed

function EditorToolbar({ editorState, onChange, onAddImage }) {
  // Toggle inline styles (bold, italic, etc.)
  const toggleInlineStyle = (style) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Toggle block types (alignment, headings, etc.)
  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          // Prompt user for image dimensions
          const width = prompt("Enter image width (px):", MAX_WIDTH);
          const height = prompt("Enter image height (px):", MAX_HEIGHT);

          // Validate dimensions
          if (isNaN(width) || width <= 0 || width > MAX_WIDTH) {
            alert(`Width must be between 1 and ${MAX_WIDTH}px.`);
            return;
          }
          if (isNaN(height) || height <= 0 || height > MAX_HEIGHT) {
            alert(`Height must be between 1 and ${MAX_HEIGHT}px.`);
            return;
          }

          onAddImage(file, width, height);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  // Prompt for link URL
  const promptForLink = () => {
    const url = window.prompt("Enter a URL:");
    if (!url) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // Apply the link to the current selection
    onChange(
      RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
    );
  };

  return (
    <div className="toolbar">
      <button onClick={() => toggleInlineStyle("BOLD")}>Bold</button>
      <button onClick={() => toggleInlineStyle("ITALIC")}>Italic</button>
      <button onClick={() => toggleBlockType("align-left")}>Left</button>
      <button onClick={() => toggleBlockType("align-center")}>Center</button>
      <button onClick={() => toggleBlockType("align-right")}>Right</button>
      <button onClick={promptForLink}>Insert Link</button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}

export default EditorToolbar;
