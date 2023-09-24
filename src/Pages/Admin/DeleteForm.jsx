import React, { useState, useRef } from "react";
import {
  arrayRemove,
  collection,
  db,
  deleteDoc,
  deleteObject,
  doc,
  getDocs,
  query,
  ref,
  storage,
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

const DeleteForm = (insertFormProps) => {
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

  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const querySnapshot = await getDocs(
        query(collection(db, "News"), where("NewsID", "==", selectedNews))
      );

      if (!querySnapshot.empty) {
        const selectedNewsDoc = querySnapshot.docs[0];

        const selectedNewsData = querySnapshot.docs[0].data();

        const imageRef = ref(storage, `${selectedNewsData.ImageURL}`);

        await deleteDoc(selectedNewsDoc.ref);

        if (imageRef) {
          try {
            await deleteObject(imageRef);
            console.log("Image deleted successfully");
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }

        // Need to fix, Remove the realted news
        const referencingNewsQuerySnapshot = await getDocs(
          query(
            collection(db, "News"),
            where("Tadmin", "array-contains", selectedNews)
          )
        );

        referencingNewsQuerySnapshot.docs.forEach((docSnapshot) => {
          const docRef = doc(db, "News", docSnapshot.id);

          const updatedRelatedNews = arrayRemove(selectedNews);
        });

        console.log("News deleted successfully!");

        setLoading(false);
        setSelectedNews(null);
      } else {
        console.error("Error getting news data: Not Found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Deleting news data: ", error);
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
                    options={insertFormProps.relatedNewsOptions}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedNews(newValue?.NewsID);
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
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                  >
                    حذف
                  </Button>
                  {showPopup && (
                    <div className={classes.popup}>
                      <div className={classes.popupContent}>
                        <p className={classes.previewTitle}>
                          هل أنت متأكد من الحذف؟
                        </p>
                        <div className={classes.popupButtons}>
                          <Button
                            variant="contained"
                            onClick={handleDelete}
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
            Message={"تم حذف بنجاح"}
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

export default DeleteForm;
