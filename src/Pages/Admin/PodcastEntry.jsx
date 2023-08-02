import React, { useState, useRef } from "react";

import { adaptV4Theme } from '@mui/material/styles';

import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "../../Utils/firebase";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import useStyles from "./styles";

import {
  Button,
  TextField,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";

const PodcastEntry = () => {
  const classes = useStyles();

  const theme = createTheme(adaptV4Theme({
    direction: "rtl", // Both here and <body dir="rtl">
  }));
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  });

  const [formValues, setFormValues] = useState({
    Title: "",
    YouTubeURL: "",
    PublishDate: serverTimestamp(),
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const form = useRef();

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const podcastData = {
        ...formValues,
      };

      const docRef = await addDoc(
        collection(db, "PodcastEpisodes"),
        podcastData
      );

      await updateDoc(doc(db, "PodcastEpisodes", docRef.id), {
        EpisodeID: docRef.id,
      });

      console.log("Document written with ID: ", docRef.id);

      setFormValues({
        Title: "",
        YouTubeURL: "",
        PublishDate: serverTimestamp(),
      });
      setLoading(false);
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValues({
      Title: form.current.Title.value,
      YouTubeURL: form.current.YouTubeURL.value,
      PublishDate: serverTimestamp(),
    });
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className={classes.progressIndicator}>
        <CircularProgress
          size={60}
          thickness={5}
          style={{ color: "#2E3190" }}
          value="100%"
        />
        <p style={{ color: "white", paddingTop: 10 }}>100%</p>{" "}
      </div>
    );
  }

  return (
    <div className={classes.containerDiv}>
      <form className={classes.form} ref={form} onSubmit={handleSubmit}>
        <CacheProvider value={cacheRtl}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <div className={classes.TextFieldDiv}>
                <TextField
                  label="العنوان"
                  name="Title"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  required
                />
                <TextField
                  label="رابط الفيديو"
                  name="YouTubeURL"
                  type="text"
                  variant="outlined"
                  style={{ width: "95%", paddingBottom: "15px" }}
                />
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                  >
                    إرسال
                  </Button>
                </div>
                {showPopup && (
                  <div className={classes.popup}>
                    <div className={classes.previewContainer}>
                      <h2 className={classes.previewTitle}>معاينة</h2>
                      <div className={classes.previewContent}>
                        {formValues.Title && (
                          <p className={classes.previewItem}>
                            <span className={classes.previewLabel}>
                              العنوان:{" "}
                            </span>
                            {formValues.Title}
                          </p>
                        )}
                        {formValues.YouTubeURL && (
                          <p className={classes.previewItem}>
                            <span className={classes.previewLabel}>
                              رابط الفيديو:{" "}
                            </span>
                            {formValues.YouTubeURL}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={classes.popupButtonContainer}>
                      <Button
                        variant="contained"
                        onClick={handleSave}
                        className={classes.saveButton}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                          backgroundColor: "transparent",
                          color: "#2E3190",
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ThemeProvider>
          </StyledEngineProvider>
        </CacheProvider>
      </form>
    </div>
  );
};

export default PodcastEntry;
