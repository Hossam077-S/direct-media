import React, { useState, useRef } from "react";
import {
  collection,
  db,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "../../Utils/firebase";

import {
  Autocomplete,
  Button,
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

const UpdateForm = (insertFormProps) => {
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

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  });

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    YoutubeLink: "",
    Hashtag: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const formRef = useRef();

  const handleGetNewsSelected = async (value) => {
    setSelectedNews(value?.NewsID);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "News"), where("NewsID", "==", value.NewsID))
      );

      // Check if any documents match the selected NewsID
      if (!querySnapshot.empty) {
        const selectedNewsData = querySnapshot.docs[0].data();

        // Use formRef to access form elements and set data
        formRef.current.Title.value = selectedNewsData.Title || "";
        formRef.current.Description.value = selectedNewsData.Description || "";
        formRef.current.YoutubeLink.value = selectedNewsData.YoutubeLink || "";
        formRef.current.Hashtag.value = selectedNewsData.Hashtag || "";
      } else {
        console.error("Error getting news data: Not Found");
      }
    } catch (error) {
      console.error("Error getting news data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({
      Title: formRef.current.Title.value,
      Description: formRef.current.Description.value,
      YoutubeLink: formRef.current.YoutubeLink.value,
      Hashtag: formRef.current.Hashtag.value,
      PublishDate: new Date(),
    });

    setShowPopup(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "News", selectedNews);
      await updateDoc(docRef, formData);
      console.log("Document updated successfully!:", selectedNews);
      setFormData({
        Title: "",
        Description: "",
        YoutubeLink: "",
        Hashtag: "",
      });

      setSnackbar(true);
      setShowPopup(false);
      setLoading(false);
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
    <div>
      {insertFormProps.activeTab === 0 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Autocomplete
                  className={classes.autocomplete}
                  options={insertFormProps.relatedNewsOptions}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleGetNewsSelected(newValue);
                    }
                  }}
                  getOptionLabel={(option) => option.Title}
                  required
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="RelatedNews"
                      label="الأخبار"
                      variant="outlined"
                      className={classes.textFieldSelect}
                    />
                  )}
                />
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
                  required
                />
                <TextField
                  label="رابط الفيديو"
                  name="YoutubeLink"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  required
                />
                <TextField
                  label="الهاشتاغ"
                  name="Hashtag"
                  type="text"
                  variant="outlined"
                  className={classes.textField}
                  required
                />
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
          <SnackbarComponent
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            error={false}
            Message={"تم التعديل بنجاح"}
          />
        </React.Suspense>
      )}

      {insertFormProps.activeTab === 1 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        ></React.Suspense>
      )}
      {insertFormProps.activeTab === 2 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        ></React.Suspense>
      )}
      {insertFormProps.activeTab === 3 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        ></React.Suspense>
      )}
    </div>
  );
};

export default UpdateForm;