import React, { useState, useRef } from "react";

import {
  storage,
  db,
  collection,
  addDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  doc,
  updateDoc,
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
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";
import ConvertImageWebp from "./ConvertImageWebp";
import SnackbarComponent from "../../Components/Snackbar/SnackbarComponent";
import { Editor } from "@tinymce/tinymce-react";

const ArticlesEntry = ({ distinctWritersName }) => {
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
    WriterID: "",
    ArticleID: "",
    Text: "",
    ImageURL: "",
    Hashtag: "",
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupWriter, setShowPopupWriter] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const form = useRef();

  const nameRef = useRef(null);
  const descRef = useRef(null);
  const editorRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await convertImageToWebP(file, "image");
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
      const uploadTask = uploadBytesResumable(storageRef, convertedImage);

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "Articles"), {
          ...formValues,
          Content: editorContent,
          ImageURL: downloadURL,
        });

        // Update the document with the ArticleID field
        await updateDoc(doc(db, "Articles", docRef.id), {
          ArticleID: docRef.id,
        });

        console.log("Document written with ID: ", docRef.id);

        await updateDoc(doc(db, "Writers", formValues.WriterID), {
          ArticleID: arrayUnion(docRef.id),
        });

        console.log("Writer Updated ID: ", formValues.WriterID);

        setFormValues({
          WriterID: "",
          ArticleID: "",
          Text: "",
          ImageURL: "",
          Hashtag: "",
          PublishDate: new Date(),
        });
        setEditorContent("");
        setLoading(false);
        setSnackbar(true);
        setShowPopup(false);
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = editorRef.current.getContent();
    setEditorContent(content);
    setFormValues({
      WriterID: form.current.WriterID.value,
      Text: form.current.Text.value,
      Hashtag: form.current.Hashtag.value,
      PublishDate: new Date(),
    });
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setShowPopupWriter(false);
  };

  const handleAddNewWriter = () => {
    setShowPopupWriter(true);
  };

  const handleSaveWriter = (event) => {
    event.preventDefault();

    // Get values from the refs
    const writerName = nameRef.current.value;
    const writerDesc = descRef.current.value;

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `Writers_Porfile_Images/${timestamp}` // Append the timestamp to the image name
      );
      const uploadTask = uploadBytesResumable(storageRef, convertedImage);

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "Writers"), {
          ProfileImage: downloadURL,
          Name: writerName,
          Description: writerDesc,
          ArticleID: [],
        });

        // Update the document with the WriterID field
        await updateDoc(doc(db, "Writers", docRef.id), {
          WriterID: docRef.id,
        });

        console.log("Document written with ID: ", docRef.id);

        setLoading(false);
        setSnackbar(true);
        setShowPopupWriter(false);
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }

    // Close the popup form after saving
    setShowPopupWriter(false);
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

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
                      إسم الكاتب
                    </InputLabel>
                    <Select
                      labelId="programName-label"
                      name="WriterID"
                      // defaultValue="N3L3ytluKU4BZTu7k3rg"
                      className={classes.textFieldSelect}
                    >
                      {distinctWritersName.map((writer, index) => (
                        <MenuItem key={index} value={writer.id}>
                          {writer.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  label="عنوان المقال"
                  name="Text"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  required
                />
                <Editor
                  apiKey="1thbepflowaqt327jgk300c6yn0xl54vbz0efjjicrirei9e"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>أدخل النص الوصفي هنا.</p>"
                  init={{
                    height: 500,
                    width: "95%",
                    directionality: "rtl", // Set text direction to right-to-left
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الهاشتاغ"
                  name="Hashtag"
                  type="text"
                  variant="outlined"
                  style={{ width: "95%", paddingBottom: "15px" }}
                />
                <div className={classes.imageFieldContainer}>
                  <label
                    htmlFor="image-upload"
                    className={classes.imageFieldLabel2}
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
                <Button
                  onClick={handleAddNewWriter}
                  style={{
                    paddingBottom: "15px",
                    fontFamily: "GE_SS_Two_B !important",
                  }}
                >
                  إضافة كاتب
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
                      {formValues.Text && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            العنوان:{" "}
                          </span>
                          {formValues.Text}
                        </p>
                      )}
                      {editorRef && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>الوصف: </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: truncate(editorContent, 100),
                            }}
                          />
                        </p>
                      )}
                      {formValues.Hashtag && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            الهاشتاغ:{" "}
                          </span>
                          {formValues.Hashtag}
                        </p>
                      )}
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
                        }}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {showPopupWriter && (
                <div className={classes.popup}>
                  <div className={classes.writerItem}>
                    {/* Writer Name */}
                    <input
                      type="text"
                      ref={nameRef}
                      placeholder="إسم الكاتب"
                      className={classes.inputField}
                    />

                    <textarea
                      type="text"
                      ref={descRef}
                      placeholder="نبذة عن الكاتب"
                      className={classes.inputField}
                    />

                    {/* Profile Image */}
                    <label
                      htmlFor="image-upload"
                      className={classes.imageFieldLabel}
                    >
                      الصورة الشخصية
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="ImageURL"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={classes.imageField}
                    />
                    <div className={classes.popupButtonContainer}>
                      <Button
                        variant="contained"
                        onClick={handleSaveWriter}
                        className={classes.saveButton}
                      >
                        حفظ
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        className={classes.cancelButton}
                      >
                        إلغاء
                      </Button>
                    </div>
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

export default ArticlesEntry;
