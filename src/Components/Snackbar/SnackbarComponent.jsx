import React, { useEffect } from "react";

import { Alert, Snackbar } from "@mui/material";

import sound from "./sound.mp3";

const SnackbarComponent = ({
  snackbar,
  setSnackbar,
  Message,
  errorMessage,
  error,
}) => {
  useEffect(() => {
    const audio = new Audio(sound);
    if (snackbar) audio.play();
  }, [snackbar]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  return (
    <div>
      <Snackbar open={snackbar} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%", textAlign: "left" }}
        >
          <p style={{ padding: "0px 10px", fontFamily: "GE_SS_Two_M" }}>
            {error ? errorMessage : Message}
          </p>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
