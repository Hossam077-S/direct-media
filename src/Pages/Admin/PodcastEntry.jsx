import React, { useState, useRef } from "react";

import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  storage,
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
  createTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const PodcastEntry = ({ distinctPodcast }) => {
  const classes = useStyles();

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
    textAlign: "center",
    palette: {
      primary: {
        main: "#2E3190",
      },
      common: {
        white: "#ffffff",
      },
      background: {
        paper: "#ffffff",
      },
      grey: {
        300: "#e0e0e0",
      },
    },
    typography: {
      fontFamily: "GE_SS_TWO_L",
      fontSize: 14,
      fontWeightBold: 700,
    },
    spacing: 8, // Define your custom spacing unit here
  });

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupPodcast, setShowPopupPodcast] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useRef();

  const nameRef = useRef(null);

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
    setShowPopupPodcast(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    setSelectedCover(file);
  };

  const handleAddNewPodcast = () => {
    setShowPopupPodcast(true);
  };

  const handleSavePodcast = (event) => {
    event.preventDefault();

    // Get values from the refs
    const PodcastName = nameRef.current.value;

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `Podcast/${timestamp}` // Append the timestamp to the image name
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);
      const uploadTask2 = uploadBytesResumable(storageRef, selectedCover);

      Promise.all([uploadTask, uploadTask2]).then(async (snapshot) => {
        const newProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(newProgress);

        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "Podcast"), {
          CoverImage: downloadURL, //Wrong
          ImageURL: downloadURL,
          Title: PodcastName,
          ProgramsID: [],
          PublishDate: serverTimestamp(),
        });

        console.log("Document written with ID: ", docRef.id);

        setSelectedImage(null);
        setLoading(false);
        setShowPopupPodcast(false);
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }

    // Close the popup form after saving
    setShowPopupPodcast(false);
  };

  if (loading) {
    return (
      <div className={classes.progressIndicator}>
        <CircularProgress
          size={60}
          thickness={5}
          style={{ color: "#2E3190" }}
          value={progress}
        />
        <p style={{ color: "white", paddingTop: 10 }}>{progress}%</p>{" "}
      </div>
    );
  }

  return (
    <div className={classes.containerDiv}>
      <form className={classes.form} ref={form} onSubmit={handleSubmit}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div className={classes.TextFieldDiv}>
              <FormControl fullWidth required>
                <InputLabel
                  id="programName-label"
                  className={classes.labelText}
                >
                  إسم البوكاست
                </InputLabel>
                <Select
                  labelId="programName-label"
                  name="Title"
                  defaultValue=""
                  className={classes.textFieldSelect}
                >
                  {distinctPodcast?.map((program, index) => (
                    <MenuItem key={index} value={program.id}>
                      {program.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <Button
                onClick={handleAddNewPodcast}
                style={{
                  paddingBottom: "15px",
                  fontFamily: "GE_SS_Two_B !important",
                }}
              >
                إضافة بودكاست
              </Button>
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
              {showPopupPodcast && (
                <div className={classes.popup}>
                  <div className={classes.writerItem}>
                    {/* Name */}
                    <input
                      type="text"
                      ref={nameRef}
                      placeholder="إسم البرنامج"
                      className={classes.inputField}
                    />

                    {/* Image */}
                    <label
                      htmlFor="image-upload"
                      className={classes.imageFieldLabel}
                    >
                      الصورة{" "}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="ImageURL"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={classes.imageField}
                    />
                    {/* Cover */}
                    <label
                      htmlFor="cover-upload"
                      className={classes.imageFieldLabel}
                    >
                      الخلفية{" "}
                    </label>
                    <input
                      id="cover-upload"
                      type="file"
                      name="ImageURL"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className={classes.imageField}
                    />
                  </div>
                  <div className={classes.popupButtonContainer}>
                    <Button
                      variant="contained"
                      onClick={handleSavePodcast}
                      className={classes.saveButton}
                    >
                      حفظ
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#2E3190",
                        fontFamily: "GE_SS_Two_B !important",
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ThemeProvider>
        </CacheProvider>
      </form>
    </div>
  );
};

export default PodcastEntry;
