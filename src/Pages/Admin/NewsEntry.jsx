import React, { useState, useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";

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
} from "../../Utils/firebase";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { v4 } from "uuid";

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
  Autocomplete,
} from "@mui/material";

import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";
import ConvertImageWebp from "./ConvertImageWebp";
import SnackbarComponent from "../../Components/Snackbar/SnackbarComponent";

const NewsEntry = ({
  distinctNewsCategory,
  categories,
  relatedNewsOptions,
}) => {
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
    NewsType: "",
    Category: "",
    YoutubeLink: "",
    ImageURL: "",
    Hashtag: "",
    Source: "",
    Tadmin: [],
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const form = useRef();
  const editorRef = useRef(null);

  const handleRelatedNewsSelect = (event, value) => {
    const isAlreadySelected = selectedNews.some(
      (news) => news?.NewsID === value?.NewsID
    );

    if (isAlreadySelected) {
      setIsAlreadySelected(true);
    } else {
      setIsAlreadySelected(false);
      if (value) {
        setSelectedNews((prevSelectedNews) => [
          ...prevSelectedNews,
          { id: v4(), value: value.title, NewsID: value.id }, // Store both Title and NewsID
        ]);
      }
    }
  };

  const handleRemoveSelectedNews = (index) => {
    setSelectedNews((prevSelectedNews) => {
      const updatedSelectedNews = [...prevSelectedNews];
      updatedSelectedNews.splice(index, 1);
      return updatedSelectedNews;
    });
  };

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

      uploadTask
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);

          const docRef = await addDoc(collection(db, "News"), {
            ...formValues,
            Description: editorContent,
            Tadmin: [...selectedNews.map((news) => news.NewsID)],
            ImageURL: downloadURL,
          });

          await updateDoc(doc(db, "News", docRef.id), {
            NewsID: docRef.id,
          });

          console.log("Document written with ID: ", docRef.id);

          setFormValues({
            Title: "",
            NewsType: "",
            Category: "",
            YoutubeLink: "",
            ImageURL: "",
            Hashtag: "",
            Source: "",
            Tadmin: [],
            PublishDate: new Date(),
          });

          setEditorContent("");
          setSelectedNews([]);
          setLoading(false);
          setSnackbar(true);
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
    const content = editorRef.current.getContent();
    setEditorContent(content);
    setFormValues({
      Title: form.current.Title.value,
      NewsType: "خبر",
      Category: form.current.Category.value,
      YoutubeLink: form.current.YoutubeLink.value,
      Hashtag: form.current.Hashtag.value,
      Source: form.current.Source.value,
      PublishDate: new Date(),
    });
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
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
                      id="category-label"
                      className={classes.labelText}
                    >
                      تصنيف الخبر
                    </InputLabel>
                    <Select
                      labelId="category-label"
                      type="select"
                      name="Category"
                      defaultValue={formValues.Category}
                      className={classes.textFieldSelect}
                    >
                      {distinctNewsCategory.length > 0
                        ? distinctNewsCategory.map((category) => (
                            <MenuItem key={category.id} value={category.title}>
                              {category.title}
                            </MenuItem>
                          ))
                        : categories.map((category) => (
                            <MenuItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  label="عنوان الخبر"
                  name="Title"
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
                    directionality: "rtl",
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
                      "directionality",
                    ],
                    toolbar:
                      "formatselect | undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image | ltr rtl | help",
                    content_style:
                      "body { font-family:AL_Jaz_Regular; font-size:14px }",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  className={`${classes.autocomplete} ${
                    isAlreadySelected ? classes.redAutocompleteInput : ""
                  }`}
                  options={relatedNewsOptions}
                  onChange={handleRelatedNewsSelect}
                  getOptionLabel={(option) => option.title} // Display the Title in the input
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="RelatedNews"
                      label="البحث عن الأخبار المرتبطة"
                      variant="outlined"
                      className={classes.textFieldSelect}
                    />
                  )}
                />
                {selectedNews.length > 0 && (
                  <div className={classes.selectedNewsContainer}>
                    {selectedNews.map((news) => (
                      <li
                        key={news.id}
                        className={`${classes.selectedNewsItem} ${classes.selectedNewsItemHover}`}
                        onClick={() => handleRemoveSelectedNews(news.id)}
                      >
                        <div
                          className={`${classes.selectedNewsItemContent} ${classes.selectedNewsItemFront}`}
                        >
                          <div className={classes.selectedNewsText}>
                            {news.value} X
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                )}
                <TextField
                  label="رابط الفيديو"
                  name="YoutubeLink"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                />
                <TextField
                  label="الهاشتاغ"
                  name="Hashtag"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                />
                <TextField
                  label="المصدر"
                  name="Source"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
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
                            العنوان:{" "}
                          </span>
                          {formValues.Title}
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
                      {formValues.NewsType && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            نوع الخبر:{" "}
                          </span>
                          {formValues.NewsType}
                        </p>
                      )}
                      {formValues.Category && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            التصنيف:{" "}
                          </span>
                          {formValues.Category}
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
                      {formValues.Hashtag && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>
                            الهاشتاغ:{" "}
                          </span>
                          {formValues.Hashtag}
                        </p>
                      )}
                      {formValues.Source && (
                        <p className={classes.previewItem}>
                          <span className={classes.previewLabel}>المصدر: </span>
                          {formValues.Source}
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

export default NewsEntry;
