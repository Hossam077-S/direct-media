import React, { useState, useEffect, useRef } from "react";

import {
  storage,
  db,
  collection,
  addDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  onSnapshot,
} from "../../Utils/firebase";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { v4 } from "uuid";

import useStyles from "./styles";

import {
  Button,
  Container,
  Grid,
  TextField,
  Snackbar,
  CircularProgress,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";

const Admin = () => {
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
    Title: "",
    Description: "",
    NewsType: "",
    Category: "",
    YoutubeLink: "",
    ImageURL: "",
    Hashtag: "",
    Tadmin: [],
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNews, setSelectedNews] = useState([]);
  const [relatedNewsOptions, setRelatedNewsOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useRef();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "News"), (snapshot) => {
      const relatedNewsOptions = snapshot.docs.map((doc) => doc.data().Title);
      setRelatedNewsOptions(relatedNewsOptions);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleRelatedNewsSelect = (event, value) => {
    const isAlreadySelected = selectedNews.some((news) => news.value === value);

    if (isAlreadySelected) {
      setIsAlreadySelected(true);
    } else {
      setIsAlreadySelected(false);
      // Continue with the selection logic
      if (value) {
        setSelectedNews((prevSelectedNews) => [
          ...prevSelectedNews,
          { id: v4(), value: value },
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
            Tadmin: [...selectedNews.map((news) => news.value)],
            ImageURL: downloadURL,
          });
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setShowSnackbar(true);
          setFormValues({
            Title: "",
            Description: "",
            NewsType: "",
            Category: "",
            YoutubeLink: "",
            ImageURL: "",
            Hashtag: "",
            Tadmin: [],
            PublishDate: new Date(),
          });
          setSelectedNews([]);
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
      Title: form.current.Title.value,
      Description: form.current.Description.value,
      NewsType: form.current.NewsType.value,
      Category: form.current.Category.value,
      YoutubeLink: form.current.YoutubeLink.value,
      Hashtag: form.current.Hashtag.value,
    });
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
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
    <Container className={classes.container}>
      <Grid item x={12}>
        <div className={classes.containerDiv}>
          <form className={classes.form} ref={form} onSubmit={handleSubmit}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <div dir="rtl" className={classes.TextFieldDiv}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.fieldContainer}>
                      <FormControl fullWidth required>
                        <InputLabel
                          id="newsType-label"
                          className={classes.labelText}
                        >
                          نوع الخبر
                        </InputLabel>
                        <Select
                          labelId="newsType-label"
                          name="NewsType"
                          type="Select"
                          defaultValue={formValues.NewsType}
                          // ref={formTypeRef} // Add ref to the Select component
                          className={classes.textFieldSelect}
                        >
                          <MenuItem value="خبر">خبر</MenuItem>
                          <MenuItem value="مقال">مقال</MenuItem>
                        </Select>
                      </FormControl>

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
                          // ref={formCategoryRef} // Add ref to the Select component
                          className={classes.textFieldSelect}
                        >
                          <MenuItem value="محلي">محلي</MenuItem>
                          <MenuItem value="صحافة">صحافة</MenuItem>
                          <MenuItem value="دولي">دولي</MenuItem>
                          <MenuItem value="برامج المنصة">برامج المنصة</MenuItem>
                          <MenuItem value="بودكاست">بودكاست</MenuItem>
                          <MenuItem value="رصد مباشر">رصد مباشر</MenuItem>
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
                    <TextField
                      label="نص الخبر"
                      name="Description"
                      type="text"
                      variant="outlined"
                      className={classes.textField}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      className={`${classes.autocomplete} ${
                        isAlreadySelected ? classes.redAutocompleteInput : ""
                      }`}
                      options={relatedNewsOptions}
                      onChange={handleRelatedNewsSelect}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="RelatedNews"
                          label="البحث عن الأخبار المرتبطة"
                          variant="outlined"
                          className={classes.textField}
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
                          {formValues.Title && (
                            <p className={classes.previewItem}>
                              <span className={classes.previewLabel}>
                                العنوان:{" "}
                              </span>
                              {formValues.Title}
                            </p>
                          )}
                          {formValues.Description && (
                            <p className={classes.previewItem}>
                              <span className={classes.previewLabel}>
                                الوصف:{" "}
                              </span>
                              {formValues.Description}
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
      </Grid>
      <Snackbar
        open={showSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        message="تم إرسال الخبر بنجاح"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        ContentProps={{
          className: classes.snackbarContent,
        }}
      />
    </Container>
  );
};

export default Admin;
