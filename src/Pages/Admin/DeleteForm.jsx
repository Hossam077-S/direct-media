import React, { useState, useRef, useContext } from "react";
import {
  arrayRemove,
  collection,
  db,
  deleteDoc,
  deleteObject,
  doc,
  getDoc,
  getDocs,
  query,
  ref,
  storage,
  updateDoc,
  where,
} from "../../Utils/firebase";

import {
  Autocomplete,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import useStyles from "./styles";
import SnackbarComponent from "../../Components/Snackbar/SnackbarComponent";
import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";
import FirestoreContext from "../../Utils/FirestoreContext2";

const DeleteForm = (insertFormProps) => {
  const classes = useStyles();

  const { handleSearch } = useContext(FirestoreContext);

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
  const [selectedListRemove, setSelectedListRemove] = useState([]);
  const [selectedListRemoveWriters, setSelectedListRemoveWriters] = useState(
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  // const handleDeleteNews = async (event) => {
  //   event.preventDefault();

  //   try {
  //     setLoading(true);

  //     const querySnapshot = await getDocs(
  //       query(collection(db, "News"), where("NewsID", "==", selectedListRemove))
  //     );

  //     if (!querySnapshot.empty) {
  //       const selectedNewsDoc = querySnapshot.docs[0];

  //       const selectedNewsData = querySnapshot.docs[0].data();

  //       const imageRef = ref(storage, `${selectedNewsData.ImageURL}`);

  //       await deleteDoc(selectedNewsDoc.ref);

  //       if (imageRef) {
  //         try {
  //           await deleteObject(imageRef);
  //           console.log("Image deleted successfully");
  //         } catch (error) {
  //           console.error("Error deleting image:", error);
  //         }
  //       }

  //       // Need to fix, Remove the realted news
  //       const referencingNewsQuerySnapshot = await getDocs(
  //         query(
  //           collection(db, "News"),
  //           where("Tadmin", "array-contains", selectedListRemove)
  //         )
  //       );

  //       referencingNewsQuerySnapshot.docs.forEach(async (docSnapshot) => {
  //         const docRef = doc(db, "News", docSnapshot.id);

  //         // Get the current value of relatedNews
  //         const updatedRelatedNews = arrayRemove(selectedListRemove);

  //         // Update relatedNews field
  //         await updateDoc(docRef, { relatedNews: updatedRelatedNews });
  //       });

  //       console.log("News deleted successfully!");

  //       setSnackbar(true);
  //       setShowPopup(false);
  //       setLoading(false);
  //       setSelectedListRemove(null);
  //     } else {
  //       console.error("Error getting news data: Not Found");
  //       setSnackbar(false);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error Deleting news data: ", error);
  //     setLoading(false);
  //   }
  // };

  const handleDeleteNews = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      console.log(selectedListRemove);
      // Loop through each selected ID and delete its corresponding news
      await Promise.all(
        selectedListRemove.map(async (news) => {
          const querySnapshot = await getDocs(
            query(collection(db, "News"), where("NewsID", "==", news.id))
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

            // Remove the selected ID from other news documents' relatedNews field
            const referencingNewsQuerySnapshot = await getDocs(
              query(
                collection(db, "News"),
                where("Tadmin", "array-contains", news.id)
              )
            );

            await Promise.all(
              referencingNewsQuerySnapshot.docs.map(async (docSnapshot) => {
                const docRef = doc(db, "News", docSnapshot.id);
                const docData = docSnapshot.data();

                // Check if relatedNews exists and is an array
                if (
                  Array.isArray(docData.relatedNews) &&
                  docData.relatedNews.length > 0
                ) {
                  // Remove the selected ID from relatedNews array
                  const updatedRelatedNews = docData.relatedNews.filter(
                    (relatedId) => relatedId !== news.id
                  );

                  // Update relatedNews field
                  await updateDoc(docRef, { relatedNews: updatedRelatedNews });
                }
              })
            );

            console.log(`News with ID ${news.id} deleted successfully!`);
          } else {
            console.error(
              `Error getting news data with ID ${news.id}: Not Found`
            );
          }
        })
      );

      setSearchQuery("");
      setSearchResults([]);
      setShowNoResults(false);

      setSnackbar(true);
      setShowPopup(false);
      setLoading(false);
      setSelectedListRemove([]); // Clear selectedListRemove after deletion
    } catch (error) {
      console.error("Error Deleting news data: ", error);
      setLoading(false);
    }
  };

  const handleDeleteArticles_Writers = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Deleting Article
      if (selectedListRemove?.length > 0) {
        const querySnapshot = await getDocs(
          query(
            collection(db, "Articles"),
            where("ArticleID", "==", selectedListRemove)
          )
        );

        if (!querySnapshot.empty) {
          const selectedDoc = querySnapshot.docs[0];

          const selectedData = querySnapshot.docs[0].data();

          const imageRef = ref(storage, `${selectedData.ImageURL}`);

          await deleteDoc(selectedDoc.ref);

          if (imageRef) {
            try {
              await deleteObject(imageRef);
              console.log("Image deleted successfully");
            } catch (error) {
              console.error("Error deleting image:", error);
            }
          }

          // Remove Related Writers
          const referencingNewsQuerySnapshot = await getDocs(
            query(
              collection(db, "Writers"),
              where("ArticleID", "array-contains", selectedListRemove)
            )
          );

          referencingNewsQuerySnapshot.docs.forEach(async (docSnapshot) => {
            const docRef = doc(db, "Writers", docSnapshot.id);

            // Get the current value of relatedNews
            const updatedWriter = arrayRemove(selectedListRemove);

            // Update relatedNews field
            await updateDoc(docRef, { ArticleID: updatedWriter });
          });

          console.log("Articles deleted successfully!");

          setSnackbar(true);
          setShowPopup(false);
          setLoading(false);
          setSelectedListRemove(null);
        } else {
          console.error("Error getting Articles data: Not Found");
          setSnackbar(false);
          setLoading(false);
        }
      }

      // Deleting Writer
      if (selectedListRemoveWriters?.length > 0) {
        const querySnapshotWriters = await getDocs(
          query(
            collection(db, "Writers"),
            where("WriterID", "==", selectedListRemoveWriters)
          )
        );

        if (!querySnapshotWriters.empty) {
          const selectedDoc = querySnapshotWriters.docs[0];

          const selectedData = querySnapshotWriters.docs[0].data();

          const imageRef = ref(storage, `${selectedData.ProfileImage}`);

          const relatedArticles = selectedData.ArticleID;

          await deleteDoc(selectedDoc.ref);

          if (imageRef) {
            try {
              await deleteObject(imageRef);
              console.log("Image deleted successfully");
            } catch (error) {
              console.error("Error deleting image:", error);
            }
          }

          // Remove Related Articles
          for (const articleId of relatedArticles) {
            // Fetch the article document
            const articleRef = doc(db, "Articles", articleId);
            const articleDoc = await getDoc(articleRef);

            if (articleDoc.exists()) {
              const articleData = articleDoc.data();

              // Delete the image from Firebase Storage
              const articleImageRef = ref(storage, articleData.ImageURL);
              try {
                await deleteObject(articleImageRef);
                console.log("Article image deleted successfully");
              } catch (error) {
                console.error("Error deleting article image:", error);
              }

              // Delete the article document
              await deleteDoc(articleRef);
              console.log("Related Article deleted successfully");
            }
          }

          console.log("Writer deleted successfully!");

          setSnackbar(true);
          setShowPopup(false);
          setLoading(false);
          setSelectedListRemove(null);
        } else {
          console.error("Error getting Writers data: Not Found");
          setSnackbar(false);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error Deleting data: ", error);
      setLoading(false);
    }
  };

  const handleDeletePrograms = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const querySnapshot = await getDocs(
        query(
          collection(db, "Programs"),
          where("ProgramID", "==", selectedListRemove)
        )
      );

      let Episodes = [];

      if (!querySnapshot.empty) {
        const selectedDoc = querySnapshot.docs[0];

        const selectedData = querySnapshot.docs[0].data();

        Episodes = querySnapshot.docs[0].data().ProgramsID;

        const imageRef = ref(storage, selectedData["Image URL"]);

        await deleteDoc(selectedDoc.ref);

        if (imageRef) {
          try {
            await deleteObject(imageRef);
            console.log("Image deleted successfully");
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }

        console.log(Episodes);

        for (const episodeID of Episodes) {
          const querySnapshot = await getDocs(
            query(
              collection(db, "ProgramsEpisodes"),
              where("EpisodeID", "==", episodeID)
            )
          );

          if (!querySnapshot.empty) {
            const selectedEpisodeDoc = querySnapshot.docs[0];
            await deleteDoc(selectedEpisodeDoc.ref);
          }
        }

        console.log("Program deleted successfully!");

        setSnackbar(true);
        setShowPopup(false);
        setLoading(false);
        setSelectedListRemove(null);
      } else {
        console.error("Error getting Articles data: Not Found");
        setSnackbar(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Deleting Articles data: ", error);
      setLoading(false);
    }
  };

  const handleDeletePodcast = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const querySnapshot = await getDocs(
        query(
          collection(db, "Podcast"),
          where("PodcastID", "==", selectedListRemove)
        )
      );

      let Episodes = [];

      if (!querySnapshot.empty) {
        const selectedDoc = querySnapshot.docs[0];

        const selectedData = querySnapshot.docs[0].data();

        Episodes = querySnapshot.docs[0].data().PodcastsID;

        const imageRefImage = ref(storage, `${selectedData.ImageURL}`);
        const imageRefCover = ref(storage, `${selectedData.CoverImage}`);

        await deleteDoc(selectedDoc.ref);

        if (imageRefImage) {
          try {
            await deleteObject(imageRefImage);
            await deleteObject(imageRefCover);
            console.log("Images deleted successfully");
          } catch (error) {
            console.error("Error deleting images:", error);
          }
        }

        for (const episodeID of Episodes) {
          const querySnapshot = await getDocs(
            query(
              collection(db, "PodcastEpisodes"),
              where("EpisodeID", "==", episodeID)
            )
          );

          if (!querySnapshot.empty) {
            const selectedEpisodeDoc = querySnapshot.docs[0];
            await deleteDoc(selectedEpisodeDoc.ref);
          }
        }

        console.log("Podcast deleted successfully!");

        setSnackbar(true);
        setShowPopup(false);
        setLoading(false);
        setSelectedListRemove(null);
      } else {
        console.error("Error getting Podcast data: Not Found");
        setSnackbar(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Deleting Podcast data: ", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowNoResults(false);
  };

  const handleToggleCheckbox = (news) => {
    const newsIndex = selectedListRemove.findIndex(
      (item) => item.id === news.id
    );
    if (newsIndex === -1) {
      setSelectedListRemove([...selectedListRemove, news]);
    } else {
      setSelectedListRemove(
        selectedListRemove.filter((item) => item.id !== news.id)
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
                  {/* Search input for filtering news */}
                  <TextField
                    label="البحث عن الأخبار المرتبطة"
                    name="SearchNews"
                    type="text"
                    variant="outlined"
                    style={{ width: "95%" }}
                    className={classes.textFieldSelect}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  {/* Search button */}
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
                  {/* Display filtered news */}
                  {showNoResults ? (
                    <Typography variant="body1">
                      ليس هناك نتائج لبحث: {searchQuery}
                    </Typography>
                  ) : (
                    <List>
                      {searchResults.map((news) => (
                        <ListItem
                          key={news.id}
                          dense
                          button
                          onClick={() => handleToggleCheckbox(news)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={selectedListRemove.some(
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
                  )}

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
                            onClick={handleDeleteNews}
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
            Message={"تم حذف الخبر بنجاح"}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 1 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.articlesOptions}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedListRemove(newValue?.id);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Articles"
                        label="المقال"
                        variant="outlined"
                        className={classes.textFieldSelect}
                      />
                    )}
                  />
                  <span>أو</span>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.WritersName}
                    onChange={(event, writers) => {
                      if (writers) {
                        setSelectedListRemoveWriters(writers?.id);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Writers"
                        label="الكتاب"
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
                            onClick={handleDeleteArticles_Writers}
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
            Message={"تم حذف المقال بنجاح"}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 2 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.ProgramsName}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedListRemove(newValue?.id);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Programs"
                        label="البرامج"
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
                            onClick={handleDeletePrograms}
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
            Message={"تم حذف البرنامج بنجاح"}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 3 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <div className={classes.TextFieldDiv}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    className={classes.autocomplete}
                    options={insertFormProps.PodcastsName}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedListRemove(newValue?.id);
                      }
                    }}
                    getOptionLabel={(option) => option.title}
                    required
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Podcast"
                        label="البودكاست"
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
                            onClick={handleDeletePodcast}
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
            Message={"تم حذف البودكاست بنجاح"}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default DeleteForm;
