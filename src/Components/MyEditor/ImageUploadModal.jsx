import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";

function ImageUploadModal({ isOpen, onClose, onInsertImage }) {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleInsertImage = () => {
    if (file) {
      onInsertImage(file, width, height);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          background: "white",
          margin: "10% auto",
          maxWidth: "400px",
        }}
      >
        <h2>Upload Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <TextField
          label="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          fullWidth
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          style={{ marginTop: "10px" }}
        />
        <Button
          onClick={handleInsertImage}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Insert
        </Button>
      </div>
    </Modal>
  );
}

export default ImageUploadModal;
