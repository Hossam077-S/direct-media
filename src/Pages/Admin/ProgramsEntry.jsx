import React, { useState, useRef } from "react";

import {
  storage,
  db,
  collection,
  addDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
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
} from "@mui/material";

import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";
import ConvertImageWebp from "./ConvertImageWebp";
import SnackbarComponent from "../../Components/Snackbar/SnackbarComponent";

const ProgramsEntry = ({ distinctProgram }) => {
  const classes = useStyles();

  const { convertedImage, convertImageToWebP } = ConvertImageWebp();

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
    Description: "",
    YoutubeLink: "",
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupProgram, setShowPopupProgram] = useState(false);

  const form = useRef();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await convertImageToWebP(file, "image");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const relatedProgramID = form.current.Title.value;

    try {
      setLoading(true);

      const programData = {
        ...formValues,
      };

      const docRef = await addDoc(
        collection(db, "ProgramsEpisodes"),
        programData
      );

      await updateDoc(doc(db, "ProgramsEpisodes", docRef.id), {
        EpisodeID: docRef.id,
      });

      await updateDoc(doc(db, "Programs", relatedProgramID), {
        ProgramsID: arrayUnion(docRef.id),
      });

      console.log("Document written with ID: ", docRef.id);

      setFormValues({
        Title: "",
        Description: "",
        YoutubeLink: "",
        PublishDate: serverTimestamp(),
      });
      setLoading(false);
      setSnackbar(true);
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValues({
      Title: form.current.Name.value,
      Description: form.current.Description.value,
      YoutubeLink: form.current.YoutubeLink.value,
      PublishDate: serverTimestamp(),
    });
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setShowPopupProgram(false);
  };

  const handleAddNewProgram = () => {
    setShowPopupProgram(true);
  };

  const handleSaveProgram = (event) => {
    event.preventDefault();

    // Get values from the refs
    const programName = nameRef.current.value;
    const programDescription = descriptionRef.current.value;

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `Programes_Images/${timestamp}` // Append the timestamp to the image name
      );
      const uploadTask = uploadBytesResumable(storageRef, convertedImage);

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "Programs"), {
          "Image URL": downloadURL,
          Title: programName,
          Description: programDescription,
          ProgramsID: [],
          PublishDate: serverTimestamp(),
        });

        console.log("Document written with ID: ", docRef.id);

        setLoading(false);
        setSnackbar(true);
        setShowPopupProgram(false);
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }

    // Close the popup form after saving
    setShowPopupProgram(false);
  };

  if (loading) {
    return <SuspenseFallback cName="progress" />;
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
                      name="Title"
                      defaultValue=""
                      className={classes.textFieldSelect}
                    >
                      {distinctProgram.map((program, index) => (
                        <MenuItem key={index} value={program.id}>
                          {program.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  label="عنوان الحلقة"
                  name="Name"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  multiline
                />
                <TextField
                  label="الوصف"
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
                <Button
                  onClick={handleAddNewProgram}
                  style={{
                    paddingBottom: "15px",
                    fontFamily: "GE_SS_Two_B !important",
                  }}
                >
                  إضافة برنامج
                </Button>
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
                    {convertedImage && (
                      <img
                        src={URL.createObjectURL(convertedImage)}
                        alt="Selected"
                        className={classes.previewImage}
                      />
                    )}
                    <div className={classes.previewContent}>
                      {formValues.Title && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            عنوان الحلقة:{" "}
                          </span>
                          {formValues.Title}
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
              {showPopupProgram && (
                <div className={classes.popup}>
                  <div className={classes.writerItem}>
                    {/* Name */}
                    <input
                      type="text"
                      ref={nameRef}
                      placeholder="إسم البرنامج"
                      className={classes.inputField}
                    />

                    <textarea
                      type="text"
                      ref={descriptionRef}
                      placeholder="الوصف"
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
                  </div>
                  <div className={classes.popupButtonContainer}>
                    <Button
                      variant="contained"
                      onClick={handleSaveProgram}
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
      <SnackbarComponent
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        error={false}
        Message={"تم التحميل بنجاح"}
      />
    </div>
  );
};

export default ProgramsEntry;
