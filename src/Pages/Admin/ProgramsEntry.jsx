import React, { useState, useRef } from "react";

import {
  storage,
  db,
  collection,
  addDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../Utils/firebase";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import useStyles from "./styles";

import {
  Button,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const ProgramsEntry = ({ categories }) => {
  const classes = useStyles();

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const [formValues, setFormValues] = useState({
    ProgramName: "",
    Description: "",
    YoutubeLink: "",
    ImageURL: "",
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `news_images/${timestamp}` // Append the timestamp to the image name
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask
        .then(async (snapshot) => {
          const newProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(newProgress);

          const downloadURL = await getDownloadURL(snapshot.ref);
          return addDoc(collection(db, "News"), {
            ...formValues,
            ImageURL: downloadURL,
          });
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setFormValues({
            ProgramName: "",
            Description: "",
            YoutubeLink: "",
            ImageURL: "",
            PublishDate: new Date(),
          });
          setSelectedImage(null);
          setLoading(false);
          setShowPopup(false);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValues({
      ProgramName: form.current.ProgramName.value,
      Description: form.current.Description.value,
      YoutubeLink: form.current.YoutubeLink.value,
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
            <div dir="rtl" className={classes.TextFieldDiv}>
              <Grid item xs={12} sm={6}>
                <div className={classes.fieldContainer}>
                  <FormControl fullWidth required>
                    <InputLabel
                      id="programName-label"
                      className={classes.labelText}
                    >
                      إسم البرنامج
                    </InputLabel>
                    <Select
                      labelId="programName-label"
                      type="select"
                      name="ProgramName"
                      defaultValue={formValues.Category}
                      // ref={formCategoryRef} // Add ref to the Select component
                      className={classes.textFieldSelect}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  label="نص البرنامج"
                  name="Description"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  multiline
                />
                <TextField
                  label="رابط الفيديو"
                  name="YoutubeLink"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.imageFieldContainer}>
                  <label
                    htmlFor="image-upload"
                    className={classes.imageFieldLabel}
                  >
                    حمل الصورة
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    name="ImageURL"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={classes.imageField}
                  />
                </div>
              </Grid>
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
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className={classes.previewImage}
                      />
                    )}
                    <div className={classes.previewContent}>
                      {formValues.ProgramName && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            إسم البرنامج:{" "}
                          </span>
                          {formValues.NewsType}
                        </p>
                      )}
                      {formValues.Description && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>الوصف: </span>
                          {formValues.Description}
                        </p>
                      )}
                      {formValues.YoutubeLink && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            رابط الفيديو:{" "}
                          </span>
                          {formValues.YoutubeLink}
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
        </CacheProvider>
      </form>
    </div>
  );
};

export default ProgramsEntry;
