import React, { useState, useRef, useContext, useEffect } from "react";

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
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
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

const UpdateForm = (insertFormProps) => {
  const classes = useStyles();

  const { articlesData, writersData, handleSearch, getRelatedNews } =
    useContext(FirestoreContext);

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

  const [formValuesWrt, setFormValuesWrt] = useState({
    Name: "",
    Description: "",
    ProfileImage: "",
  });

  const [loading, setLoading] = useState(false);

  const [editorContent, setEditorContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedArticle, setSelectedArticle] = useState([]);
  const [selectedWriter, setSelectedWriter] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [oldImage, setOldImage] = useState("");

  const [selectedNews, setSelectedNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const [selectedRelatedNews, setSelectedRelatedNews] = useState([]);
  const [searchRelatedQuery, setSearchRelatedQuery] = useState("");
  const [searchRelatedResults, setSearchRelatedResults] = useState([]);
  const [showNoRelatedResults, setShowNoRelatedResults] = useState(false);

  const [openfield, setOpenField] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const [imageConversionComplete, setImageConversionComplete] = useState(false);

  const formRef = useRef();
  const editorRef = useRef("");

  // useEffect hook to call handleGetNewsSelected when selectedNewsId changes
  useEffect(() => {
    if (selectedNewsId !== null) {
      handleGetNewsSelected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNewsId]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await convertImageToWebP(file, "image");
    setImageConversionComplete(true);
  };

  const handleOpenFields = (newsId) => {
    setOpenField(true);
    setSelectedNewsId(newsId); // Set the selected news ID
  };

  const handleGetNewsSelected = async () => {
    if (openfield) {
      setSearchResults([]);
      setSearchQuery("");

      formRef.current.Title.value = "";
      setSelectedCategory("");
      formRef.current.YoutubeLink.value = "";
      formRef.current.Hashtag.value = "";
      formRef.current.Source.value = "";

      try {
        const news = searchResults?.find(
          (news) => news?.NewsID === selectedNewsId
        );
        // Check if any documents match the selected NewsID
        if (!news?.empty) {
          // Use formRef to access form elements and set data
          formRef.current.Title.value = news?.Title || "";
          setSelectedCategory(news.Category || "");
          formRef.current.YoutubeLink.value = news?.YoutubeLink || "";
          formRef.current.Hashtag.value = news?.Hashtag || "";
          formRef.current.Source.value = news?.Source || "";

          // Fetch and set related news
          const relatedNews = await getRelatedNews(news?.Tadmin);
          setSelectedRelatedNews(relatedNews || []);

          // Use `setContent` to update the editor's content
          if (editorRef.current) {
            editorRef.current.setContent(news?.Description || "");
          }

          if (news?.ImageURL) setImageConversionComplete(true);

          setOldImage(news?.ImageURL);
        } else {
          console.error("Error getting news data: Not Found");
        }
      } catch (error) {
        console.error("Error getting news data: ", error);
      }
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
        console.error("Error getting article data: Not Found");
      }
    } catch (error) {
      console.error("Error getting article data: ", error);
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

            const docRef = doc(db, "News", selectedNewsId);
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

            console.log("Document updated successfully!:", selectedNewsId);

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

            setSelectedNews([]);
            setSearchQuery("");
            setSearchResults([]);
            setShowNoResults(false);

            setSelectedRelatedNews([]);
            setSearchRelatedQuery("");
            setSearchRelatedResults([]);
            setShowNoRelatedResults(false);
            setOpenField(false);
            setSelectedNewsId(null);
            setImageConversionComplete(false);

            convertImageToWebP(null, "empty");
            setEditorContent("");
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
        const docRef = doc(db, "News", selectedNewsId);
        await updateDoc(docRef, {
          ...formData,
          Description: editorContent, // Include editor content
          Tadmin: [...selectedRelatedNews.map((news) => news.NewsID)], // Include related news IDs
        });

        console.log("Document updated successfully!:", selectedNewsId);

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

        setSelectedNews([]);
        setSearchQuery("");
        setSearchResults([]);
        setShowNoResults(false);

        setSelectedRelatedNews([]);
        setSearchRelatedQuery("");
        setSearchRelatedResults([]);
        setShowNoRelatedResults(false);
        setOpenField(false);
        setSelectedNewsId(null);
        setImageConversionComplete(false);

        convertImageToWebP(null, "empty");
        setEditorContent("");
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

            console.log("Document updated successfully!:", selectedArticle);

            setFormData({
              Text: "",
              ImageURL: "",
              Hashtag: "",
            });

            convertImageToWebP(null, "empty");
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

        console.log("Document updated successfully!:", selectedArticle);

        setFormData({
          Text: "",
          ImageURL: "",
          Hashtag: "",
        });

        convertImageToWebP(null, "empty");
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

  // Writer
  const handleGetWriterSelected = async (value) => {
    setSelectedWriter(value?.id);
    formRef.current.wrName.value = "";
    formRef.current.wrDescription.value = "";

    try {
      const writer = writersData?.find((writer) => writer.id === value.id);
      // Check if any documents match the selected ArticleID
      if (!writer.empty) {
        // Use formRef to access form elements and set data
        formRef.current.wrName.value = writer?.Name || "";
        formRef.current.wrDescription.value = writer?.Description || "";

        setOldImage(writer?.ProfileImage);
      } else {
        console.error("Error getting writer data: Not Found");
      }
    } catch (error) {
      console.error("Error getting writer data: ", error);
    }
  };

  const handleSubmitWrt = async (event) => {
    event.preventDefault();

    setFormValuesWrt({
      Name: formRef.current.wrName.value,
      Description: formRef.current.wrDescription.value,
    });

    setShowPopup(true);
  };

  const handleUpdateWrt = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const timestamp = Date.now(); // Get the current timestamp
      const storageRef = ref(
        storage,
        `Writers_Porfile_Images/${timestamp}` // Append the timestamp to the image name
      );

      const imageRef = ref(storage, oldImage);

      if (convertedImage) {
        const uploadTask = uploadBytesResumable(storageRef, convertedImage);

        uploadTask
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = doc(db, "Writers", selectedWriter);
            await updateDoc(docRef, {
              ...formValuesWrt,
              ProfileImage: downloadURL,
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

            console.log("Document updated successfully!:", selectedWriter);

            setFormValuesWrt({
              Name: "",
              Description: "",
              ProfileImage: "",
            });

            convertImageToWebP(null, "empty");
            setSelectedWriter(null);
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
        const docRef = doc(db, "Writers", selectedWriter);
        await updateDoc(docRef, {
          ...formValuesWrt,
        });

        console.log("Document updated successfully!:", selectedWriter);

        setFormValuesWrt({
          Name: "",
          Description: "",
          ProfileImage: "",
        });

        convertImageToWebP(null, "empty");
        setSelectedWriter(null);
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

  // Serach
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowNoResults(false);
    setOpenField(false);
  };

  const handleSearchRelatedInputChange = (event) => {
    setSearchRelatedQuery(event.target.value);
    setShowNoRelatedResults(false);
  };

  const handleToggleCheckbox = (news) => {
    const newsIndex = selectedRelatedNews.findIndex(
      (item) => item.id === news.id
    );
    if (newsIndex === -1) {
      setSelectedRelatedNews([...selectedRelatedNews, news]);
    } else {
      setSelectedRelatedNews(
        selectedRelatedNews.filter((item) => item.id !== news.id)
      );
    }
  };

  const handleToggleCheckboxNew = (news) => {
    const newsIndex = selectedRelatedNews.findIndex(
      (item) => item.id === news.id
    );
    if (newsIndex === -1) {
      setSelectedRelatedNews([...selectedRelatedNews, news]);
    } else {
      setSelectedRelatedNews(
        selectedRelatedNews.filter((item) => item.id !== news.id)
      );
    }
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
                  <TextField
                    label="البحث عن الأخبار"
                    name="SearchNews"
                    type="text"
                    variant="outlined"
                    style={{ width: "95%" }}
                    className={classes.textFieldSelect}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleSearch(
                        searchQuery,
                        setSearchResults,
                        setShowNoResults
                      )
                    }
                    className={classes.searchButton}
                  >
                    بحث
                  </Button>
                  {showNoResults ? (
                    <Typography variant="body1">
                      ليس هناك نتائج لبحث: {searchQuery}
                    </Typography>
                  ) : (
                    <List>
                      {/* Your list of search results */}
                      {searchResults.map((news) => (
                        <ListItem
                          key={news.id}
                          dense
                          button
                          selected={selectedNews === news.id}
                        >
                          <ListItemText
                            onClick={() => handleOpenFields(news.id)}
                            selected={selectedNewsId === news.id} // Highlight the selected news item
                            primary={news.Title}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  <div style={{ display: openfield ? "block" : "none" }}>
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
                              <MenuItem
                                key={category.id}
                                value={category.title}
                              >
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
                    <TextField
                      label="البحث عن الأخبار المرتبطة"
                      name="SearchNews"
                      type="text"
                      variant="outlined"
                      style={{ width: "95%" }}
                      className={classes.textFieldSelect}
                      value={searchRelatedQuery}
                      onChange={handleSearchRelatedInputChange}
                    />
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleSearch(
                          searchRelatedQuery,
                          setSearchRelatedResults,
                          setShowNoRelatedResults
                        )
                      }
                      className={classes.searchButton}
                    >
                      بحث
                    </Button>
                    {showNoRelatedResults ? (
                      <Typography variant="body1">
                        ليس هناك نتائج لبحث: {searchQuery}
                      </Typography>
                    ) : (
                      <>
                        <List>
                          {/* Your list of search results */}
                          {selectedRelatedNews.map((news) => (
                            <ListItem
                              key={news.id}
                              dense
                              button
                              onClick={() => handleToggleCheckbox(news)}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={selectedRelatedNews.some(
                                    (item) => item.id === news.id
                                  )}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText primary={news.Title} />
                            </ListItem>
                          ))}
                        </List>

                        <Divider />

                        <List>
                          {searchRelatedResults.map((news) => (
                            <ListItem
                              key={news.id}
                              dense
                              button
                              onClick={() => handleToggleCheckboxNew(news)}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={selectedRelatedNews.some(
                                    (item) => item.id === news.id
                                  )}
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText primary={news.Title} />
                            </ListItem>
                          ))}
                        </List>
                      </>
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
                    {imageConversionComplete && (
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitButton}
                      >
                        تحديث
                      </Button>
                    )}
                  </div>
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
                        "formatselect | undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image | ltr rtl | help",
                      content_style:
                        "body { font-family:AL_Jaz_Regular; font-size:14px }",
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

      {insertFormProps.activeTab === 2 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmitWrt}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.WritersName}
                    onChange={(event, writerValue) => {
                      if (writerValue) {
                        handleGetWriterSelected(writerValue);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Writer"
                        label="الكاتب"
                        variant="outlined"
                        className={classes.textFieldSelect}
                      />
                    )}
                  />
                  <TextField
                    label="إسم الكاتب"
                    name="wrName"
                    type="text"
                    variant="outlined"
                    className={classes.textField}
                    required
                  />
                  <TextField
                    label="وصف الكاتب"
                    name="wrDescription"
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
                      name="wrtImageURL"
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
                            onClick={handleUpdateWrt}
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
