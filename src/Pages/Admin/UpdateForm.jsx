import React, { useState, useRef, useContext } from "react";

import { Editor } from "@tinymce/tinymce-react";

import {
  db,
  deleteObject,
  doc,
  getDownloadURL,
  ref,
  storage,
  updateDoc,
  uploadBytesResumable,
} from "../../Utils/firebase";

import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import useStyles from "./styles";
import SnackbarComponent from "../../Components/Snackbar/SnackbarComponent";
import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";
import ConvertImageWebp from "./ConvertImageWebp";

import FirestoreContext from "../../Utils/FirestoreContext2";

import { v4 } from "uuid";

const UpdateForm = (insertFormProps) => {
  const classes = useStyles();

  const { newsData, articlesData } = useContext(FirestoreContext);

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

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  });

  const [formData, setFormData] = useState({
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

  const [formValues, setFormValues] = useState({
    Text: "",
    ImageURL: "",
    Hashtag: "",
    PublishDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [selectedRelatedNews, setSelectedRelatedNews] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedArticle, setSelectedArticle] = useState([]);

  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [oldImage, setOldImage] = useState("");

  const formRef = useRef();
  const editorRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await convertImageToWebP(file, "image");
  };

  const handleRelatedNewsSelect = (event, value) => {
    const isAlreadySelected = selectedRelatedNews.some(
      (news) => news?.NewsID === value?.NewsID
    );

    if (isAlreadySelected) {
      setIsAlreadySelected(true);
    } else {
      setIsAlreadySelected(false);
      if (value) {
        setSelectedRelatedNews((prevSelectedNews) => [
          ...prevSelectedNews,
          { id: v4(), value: value.title, NewsID: value.id }, // Store both Title and NewsID
        ]);
      }
    }
  };

  const handleRemoveSelectedNews = (index) => {
    setSelectedRelatedNews((prevSelectedNews) => {
      const updatedSelectedNews = [...prevSelectedNews];
      updatedSelectedNews.splice(index, 1);
      return updatedSelectedNews;
    });
  };

  // Function to fetch related news titles based on their IDs
  const fetchRelatedNewsTitles = async (relatedNewsIds) => {
    if (!relatedNewsIds || relatedNewsIds.length === 0) {
      return [];
    }

    const relatedNewsPromises = relatedNewsIds.map(async (id) => {
      // Assuming newsData is an array of all news items
      const relatedNewsItem = newsData?.find((item) => item.NewsID === id);
      return { id: v4(), value: relatedNewsItem?.Title, NewsID: id };
    });

    return Promise.all(relatedNewsPromises);
  };

  const handleGetNewsSelected = async (value) => {
    setSelectedNews(value?.id);
    formRef.current.Title.value = "";
    setSelectedCategory("");
    formRef.current.YoutubeLink.value = "";
    formRef.current.Hashtag.value = "";
    formRef.current.Source.value = "";

    try {
      const news = newsData?.find((news) => news.id === value.id);

      // Check if any documents match the selected NewsID
      if (!news.empty) {
        // Use formRef to access form elements and set data
        formRef.current.Title.value = news.Title || "";
        setSelectedCategory(news.Category || "");
        formRef.current.YoutubeLink.value = news.YoutubeLink || "";
        formRef.current.Hashtag.value = news.Hashtag || "";
        formRef.current.Source.value = news.Source || "";

        // Fetch and set related news
        const relatedNews = await fetchRelatedNewsTitles(news.Tadmin);
        setSelectedRelatedNews(relatedNews);

        // Use `setContent` to update the editor's content
        if (editorRef.current) {
          editorRef.current.setContent(news.Description || "");
        }

        setOldImage(news.ImageURL);
      } else {
        console.error("Error getting news data: Not Found");
      }
    } catch (error) {
      console.error("Error getting news data: ", error);
    }
  };

  const handleGetArticleSelected = async (value) => {
    setSelectedArticle(value?.id);
    formRef.current.artTitle.value = "";
    formRef.current.Hashtag.value = "";

    try {
      const article = articlesData?.find((article) => article.id === value.id);
      // Check if any documents match the selected ArticleID
      if (!article.empty) {
        // Use formRef to access form elements and set data
        formRef.current.artTitle.value = article.Text || "";
        formRef.current.Hashtag.value = article.Hashtag || "";

        // Use `setContent` to update the editor's content
        if (editorRef.current) {
          editorRef.current.setContent(article.Content || "");
        }

        setOldImage(article.ImageURL);
      } else {
        console.error("Error getting news data: Not Found");
      }
    } catch (error) {
      console.error("Error getting news data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditorContent(editorRef.current.getContent());
    setFormData({
      Title: formRef.current.Title.value,
      NewsType: "خبر",
      Category: formRef.current.Category.value,
      YoutubeLink: formRef.current.YoutubeLink.value,
      Hashtag: formRef.current.Hashtag.value,
      Source: formRef.current.Source.value,
      PublishDate: new Date(),
    });

    setShowPopup(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `news_images/${timestamp}` // Append the timestamp to the image name
      );

      const imageRef = ref(storage, oldImage);

      if (convertedImage) {
        const uploadTask = uploadBytesResumable(storageRef, convertedImage);

        uploadTask
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = doc(db, "News", selectedNews);
            await updateDoc(docRef, {
              ...formData,
              Description: editorContent,
              Tadmin: [...selectedRelatedNews.map((news) => news.NewsID)],
              ImageURL: downloadURL,
            });

            // Optionally, you can delete the old image if needed
            if (oldImage) {
              try {
                // Delete the image
                await deleteObject(imageRef);
                console.log("Image deleted successfully");
              } catch (error) {
                console.error("Error deleting image:", error);
              }
            }

            console.log("Document updated successfully!:", selectedNews);

            setFormData({
              Title: "",
              NewsType: "",
              Category: "",
              YoutubeLink: "",
              ImageURL: "",
              Hashtag: "",
              Source: "",
              Tadmin: [],
            });

            setSelectedRelatedNews([]);
            setEditorContent("");
            setSelectedNews(null);
            setSelectedCategory("");
            setOldImage("");
            setSnackbar(true);
            setShowPopup(false);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            setLoading(false);
          });
      } else {
        const docRef = doc(db, "News", selectedNews);
        await updateDoc(docRef, {
          ...formData,
          Description: editorContent, // Include editor content
          Tadmin: [...selectedRelatedNews.map((news) => news.NewsID)], // Include related news IDs
        });

        console.log("Document updated successfully!:", selectedNews);

        setFormData({
          Title: "",
          NewsType: "",
          Category: "",
          YoutubeLink: "",
          ImageURL: "",
          Hashtag: "",
          Source: "",
          Tadmin: [],
        });

        setSelectedRelatedNews([]);
        setEditorContent("");
        setSelectedNews(null);
        setSelectedCategory("");
        setOldImage("");
        setSnackbar(true);
        setShowPopup(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setLoading(false);
    }
  };

  const handleSubmitArt = async (event) => {
    event.preventDefault();
    setEditorContent(editorRef.current.getContent());
    setFormValues({
      Text: formRef.current.artTitle.value,
      Hashtag: formRef.current.Hashtag.value,
      PublishDate: new Date(),
    });

    setShowPopup(true);
  };

  const handleUpdateArt = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `news_images/${timestamp}` // Append the timestamp to the image name
      );

      const imageRef = ref(storage, oldImage);

      if (convertedImage) {
        const uploadTask = uploadBytesResumable(storageRef, convertedImage);

        uploadTask
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = doc(db, "Articles", selectedArticle);
            await updateDoc(docRef, {
              ...formValues,
              Content: editorContent,
              ImageURL: downloadURL,
            });

            // Optionally, you can delete the old image if needed
            if (oldImage) {
              try {
                // Delete the image
                await deleteObject(imageRef);
                console.log("Image deleted successfully");
              } catch (error) {
                console.error("Error deleting image:", error);
              }
            }

            console.log("Document updated successfully!:", selectedNews);

            setFormData({
              Text: "",
              ImageURL: "",
              Hashtag: "",
            });

            setEditorContent("");
            setSelectedArticle(null);
            setOldImage("");
            setSnackbar(true);
            setShowPopup(false);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            setLoading(false);
          });
      } else {
        const docRef = doc(db, "Articles", selectedArticle);
        await updateDoc(docRef, {
          ...formValues,
          Content: editorContent, // Include editor content
        });

        console.log("Document updated successfully!:", selectedNews);

        setFormData({
          Text: "",
          ImageURL: "",
          Hashtag: "",
        });

        setEditorContent("");
        setSelectedArticle(null);
        setOldImage("");
        setSnackbar(true);
        setShowPopup(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <SuspenseFallback cName="progress" />;
  }

  return (
    <div className={classes.containerDiv}>
      {insertFormProps.activeTab === 0 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.NewsOptions}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        handleGetNewsSelected(newValue);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="News"
                        label="الأخبار"
                        variant="outlined"
                        className={classes.textFieldSelect}
                      />
                    )}
                  />
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
                      className={classes.textFieldSelect}
                      value={selectedCategory} // Controlled by state
                      onChange={(e) => setSelectedCategory(e.target.value)} // Update state on change
                    >
                      {insertFormProps.NewsCategory.length > 0
                        ? insertFormProps.NewsCategory.map((category) => (
                            <MenuItem key={category.id} value={category.title}>
                              {category.title}
                            </MenuItem>
                          ))
                        : insertFormProps.categories.map((category) => (
                            <MenuItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
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
                    initialValue={editorRef.current}
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
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image | ltr rtl | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                  <Autocomplete
                    className={`${classes.autocomplete} ${
                      isAlreadySelected ? classes.redAutocompleteInput : ""
                    }`}
                    options={insertFormProps.NewsOptions}
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
                  {selectedRelatedNews.length > 0 && (
                    <div className={classes.selectedNewsContainer}>
                      {selectedRelatedNews.map((news) => (
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
                      تعديل الصورة
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
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                  >
                    تحديث
                  </Button>
                  {showPopup && (
                    <div className={classes.popup}>
                      <div className={classes.popupContent}>
                        <p className={classes.previewTitle}>
                          هل أنت متأكد من التعديل؟
                        </p>
                        <div className={classes.popupButtons}>
                          <Button
                            variant="contained"
                            onClick={handleUpdate}
                            className={classes.saveButton}
                          >
                            نعم
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
                </ThemeProvider>
              </CacheProvider>
            </form>
          </div>
          <SnackbarComponent
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            error={false}
            Message={"تم التعديل الخبر بنجاح"}
          />
        </React.Suspense>
      )}

      {insertFormProps.activeTab === 1 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmitArt}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.articlesOptions}
                    onChange={(event, articleValue) => {
                      if (articleValue) {
                        handleGetArticleSelected(articleValue);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Article"
                        label="المقال"
                        variant="outlined"
                        className={classes.textFieldSelect}
                      />
                    )}
                  />
                  <TextField
                    label="عنوان المقال"
                    name="artTitle"
                    type="text"
                    variant="outlined"
                    className={classes.textField}
                    required
                  />
                  <Editor
                    apiKey="1thbepflowaqt327jgk300c6yn0xl54vbz0efjjicrirei9e"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={editorRef.current}
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
                        "directionality",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image | ltr rtl | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
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
                      className={classes.imageFieldLabel2}
                    >
                      تعديل الصورة
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="artImageURL"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={classes.imageField}
                    />
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                  >
                    تحديث
                  </Button>
                  {showPopup && (
                    <div className={classes.popup}>
                      <div className={classes.popupContent}>
                        <p className={classes.previewTitle}>
                          هل أنت متأكد من التعديل؟
                        </p>
                        <div className={classes.popupButtons}>
                          <Button
                            variant="contained"
                            onClick={handleUpdateArt}
                            className={classes.saveButton}
                          >
                            نعم
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
                </ThemeProvider>
              </CacheProvider>
            </form>
          </div>
          <SnackbarComponent
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            error={false}
            Message={"تم التعديل المقال بنجاح"}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default UpdateForm;
