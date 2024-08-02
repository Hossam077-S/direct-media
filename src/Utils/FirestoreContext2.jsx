import React, { createContext, useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  doc,
  getDoc,
  storage,
  ref,
  getDownloadURL,
} from "../Utils/firebase";

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    allData: [],
    newsData: [],
    relatedNews: [],
    programsData: [],
    writersData: [],
    articlesData: [],
    podcastData: [],
    podcastDataEpisodes: [],
    programsDataEpisodes: [],
    groupedData: {},
    groupedProgramsData: {},
    newsCategoreis: [],
  });

  const [lastDocNews, setLastDocNews] = useState(null);
  const [lastDocCategory, setLastDocCategory] = useState({});

  // Combine useEffects when possible to minimize subscriptions
  useEffect(() => {
    let unsubscribeNews;
    let unsubscribePrograms;
    let unsubscribeWriters;
    let unsubscribeArticles;
    let unsubscribePodcast;
    let unsubscribePodcastEpisodes;
    let unsubscribeProgramsEpisodes;
    let unsubscribeNewsCategory;
    let unsubscribeCategory;

    const fetchData = async () => {
      const categories = [
        "عاجل",
        "صحافة",
        "محلي",
        "دولي",
        "طقس",
        "عالمية",
        "تقرير",
        "منوعات",
      ];

      // Subscribe to news collection
      const newsQuery = query(
        collection(db, "News"),
        orderBy("PublishDate", "desc"),
        limit(20)
      );
      unsubscribeNews = onSnapshot(newsQuery, (snapshot) => {
        const processedData = processNewsData(snapshot);

        // Update lastDocNews with the last visible document
        const lastVisibleNews = snapshot.docs[snapshot.docs.length - 1];
        setLastDocNews(lastVisibleNews);

        setData((prevData) => ({
          ...prevData,
          newsData: processedData.newsData,
        }));
      });

      // Getting latest 20 news by category

      // categories.forEach((category) => {
      //   const newsbyCategoryQuery = query(
      //     collection(db, "News"),
      //     orderBy("PublishDate", "desc"),
      //     where("Category", "==", category),
      //     limit(20)
      //   );

      //   unsubscribeCategory = onSnapshot(newsbyCategoryQuery, (snapshot) => {
      //     const processedData = processCategoryNews(snapshot, category);

      //     // Update lastDocCategory with the last visible document
      //     const lastVisibleCategory = snapshot.docs[snapshot.docs.length - 1];
      //     setLastDocCategory((prevLastDocs) => ({
      //       ...prevLastDocs,
      //       [category]: lastVisibleCategory,
      //     }));

      //     setData((prevData) => ({
      //       ...prevData,
      //       groupedData: {
      //         ...prevData.groupedData,
      //         ...processedData.groupedData,
      //       },
      //     }));
      //   });
      // });

      categories.forEach((category) => {
        let newsbyCategoryQuery;

        if (category === "منوعات") {
          // Combine news from both "رياضة" and "منوعات"
          newsbyCategoryQuery = query(
            collection(db, "News"),
            orderBy("PublishDate", "desc"),
            where("Category", "in", ["رياضة", "منوعات"]),
            limit(20)
          );
        } else {
          // Standard query for other categories
          newsbyCategoryQuery = query(
            collection(db, "News"),
            orderBy("PublishDate", "desc"),
            where("Category", "==", category),
            limit(20)
          );
        }

        unsubscribeCategory = onSnapshot(newsbyCategoryQuery, (snapshot) => {
          const processedData = processCategoryNews(snapshot, category);

          // Update lastDocCategory with the last visible document
          const lastVisibleCategory = snapshot.docs[snapshot.docs.length - 1];
          setLastDocCategory((prevLastDocs) => ({
            ...prevLastDocs,
            [category]: lastVisibleCategory,
          }));

          setData((prevData) => ({
            ...prevData,
            groupedData: {
              ...prevData.groupedData,
              ...processedData.groupedData,
            },
          }));
        });
      });

      // Subscribe to programs collection
      const programsQuery = collection(db, "Programs");
      unsubscribePrograms = onSnapshot(programsQuery, (snapshot) => {
        processProgramsData(snapshot)
          .then((processedData) => {
            setData((prevData) => ({
              ...prevData,
              programsData: processedData.programsData,
              groupedProgramsData: processedData.groupedProgramsData,
            }));
          })
          .catch((error) => {
            console.error("Error processing programs data:", error);
          });
      });

      const writersQuery = collection(db, "Writers");
      unsubscribeWriters = onSnapshot(writersQuery, (snapshot) => {
        processWritersData(snapshot).then((processedData) => {
          setData((prevData) => ({
            ...prevData,
            writersData: processedData,
          }));
        });
      });

      const articlesQuery = collection(db, "Articles");
      unsubscribeArticles = onSnapshot(articlesQuery, (snapshot) => {
        processArticlesData(snapshot).then((processedData) => {
          setData((prevData) => ({
            ...prevData,
            articlesData: processedData,
          }));
        });
      });

      const podcastQuery = collection(db, "Podcast");
      unsubscribePodcast = onSnapshot(podcastQuery, (snapshot) => {
        processPodcastsData(snapshot).then((processedData) => {
          setData((prevData) => ({
            ...prevData,
            podcastData: processedData,
          }));
        });
      });

      const podcastEpisodesQuery = collection(db, "PodcastEpisodes");
      unsubscribePodcastEpisodes = onSnapshot(
        podcastEpisodesQuery,
        (snapshot) => {
          processPodcastsDataEpisodes(snapshot).then((processedData) => {
            setData((prevData) => ({
              ...prevData,
              podcastDataEpisodes: processedData,
            }));
          });
        }
      );

      const programsEpisodesQuery = collection(db, "ProgramsEpisodes");
      unsubscribeProgramsEpisodes = onSnapshot(
        programsEpisodesQuery,
        (snapshot) => {
          processPorogramssDataEpisodes(snapshot).then((processedData) => {
            setData((prevData) => ({
              ...prevData,
              programsDataEpisodes: processedData,
            }));
          });
        }
      );

      const categoriesQuery = collection(db, "Categories");
      unsubscribeNewsCategory = onSnapshot(categoriesQuery, (snapshot) => {
        processCategoriesData(snapshot).then((processedData) => {
          setData((prevData) => ({
            ...prevData,
            newsCategoreis: processedData,
          }));
        });
      });

      // Set loading to false once data is fetched
      setLoading(false);
    };

    fetchData();

    // Cleanup function to unsubscribe from collections
    return () => {
      if (unsubscribeNews) unsubscribeNews();
      if (unsubscribeCategory) unsubscribeCategory();
      if (unsubscribePrograms) unsubscribePrograms();
      if (unsubscribeWriters) unsubscribeWriters();
      if (unsubscribeArticles) unsubscribeArticles();
      if (unsubscribePodcast) unsubscribePodcast();
      if (unsubscribePodcastEpisodes) unsubscribePodcastEpisodes();
      if (unsubscribeProgramsEpisodes) unsubscribeProgramsEpisodes();
      if (unsubscribeNewsCategory) unsubscribeNewsCategory();
    };
  }, []);

  const fetchMoreNews = async (category) => {
    try {
      let queryRef;
      let lastVisible;

      // Construct the base query
      let baseQuery = query(
        collection(db, "News"),
        orderBy("PublishDate", "desc")
      );

      // Adjust the query based on the category
      if (category && category !== "كل الأخبار") {
        baseQuery = query(baseQuery, where("Category", "==", category));
        lastVisible = lastDocCategory[category];
      } else {
        lastVisible = lastDocNews;
      }

      // If there is a last visible document, start the query after it
      if (lastVisible) {
        baseQuery = query(baseQuery, startAfter(lastVisible));
      }

      // Limit the query to 10 documents
      queryRef = query(baseQuery, limit(10));

      // Execute the query
      const additionalNewsSnapshot = await getDocs(queryRef);
      const additionalNewsData = additionalNewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update the last visible document
      lastVisible =
        additionalNewsSnapshot.docs[additionalNewsSnapshot.docs.length - 1];
      if (category && category !== "كل الأخبار") {
        setLastDocCategory((prevLastDocs) => ({
          ...prevLastDocs,
          [category]: lastVisible,
        }));
      } else {
        setLastDocNews(lastVisible);
      }

      // Update the state with the fetched additional news data
      setData((prevData) => ({
        ...prevData,
        ...(category && category !== "كل الأخبار"
          ? {
              groupedData: {
                ...prevData.groupedData,
                [category]: [
                  ...(prevData.groupedData[category] || []),
                  ...additionalNewsData.filter((newNewsItem) => {
                    // Filter out news items that already exist in the state
                    return !prevData.groupedData[category]?.some(
                      (existingNewsItem) =>
                        existingNewsItem.NewsID === newNewsItem.NewsID
                    );
                  }),
                ],
              },
            }
          : {
              newsData: [
                ...prevData.newsData,
                ...additionalNewsData.filter((newNewsItem) => {
                  // Filter out news items that already exist in the state
                  return !prevData.newsData.some(
                    (existingNewsItem) =>
                      existingNewsItem.NewsID === newNewsItem.NewsID
                  );
                }),
              ],
            }),
      }));
    } catch (error) {
      console.error("Error fetching additional news:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const fetchAllNews = () => {
    try {
      const NewsQuery = query(
        collection(db, "News"),
        orderBy("PublishDate", "desc")
      );

      // Create a promise to handle the subscription
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          NewsQuery,
          (snapshot) => {
            const NewsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setData((prevData) => ({
              ...prevData,
              allData: NewsData,
            }));

            resolve(unsubscribe); // Resolve the promise with the unsubscribe function
          },
          reject
        ); // Reject the promise if there is an error
      });
    } catch (error) {
      console.error("Error fetching additional news:", error);
      // Handle error appropriately, e.g., show error message to the user
      throw error; // Rethrow the error to propagate it to the caller
    }
  };

  const fetchRelatedNews = async (relatedNewsItems) => {
    if (!Array.isArray(relatedNewsItems) || relatedNewsItems.length === 0) {
      setData((prevData) => ({
        ...prevData,
        relatedNews: [],
      }));
      return; // Exit early if relatedNewsItems is not an array or is empty
    }

    try {
      let NewsQuery = query(
        collection(db, "News"),
        orderBy("NewsID"),
        where("NewsID", "in", relatedNewsItems)
      );

      // Fetch additional news
      const NewsSnapshot = await getDocs(NewsQuery);
      const NewsData = NewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Group the fetched NewsData by their categories
      const groupedNewsData = NewsData.reduce((acc, newsItem) => {
        const category = newsItem.Category;
        acc[category] = [...(acc[category] || []), newsItem];
        return acc;
      }, {});

      setData((prevData) => ({
        ...prevData,
        groupedData: {
          ...prevData.groupedData,
          ...Object.keys(groupedNewsData).reduce((acc, category) => {
            acc[category] = [
              ...(prevData.groupedData[category] || []),
              ...groupedNewsData[category].filter((newNewsItem) => {
                // Filter out news items that already exist in the state
                return !prevData.groupedData[category]?.some(
                  (existingNewsItem) =>
                    existingNewsItem.NewsID === newNewsItem.NewsID
                );
              }),
            ];
            return acc;
          }, {}),
        },
        relatedNews: NewsData,
      }));
    } catch (error) {
      console.error("Error fetching additional news:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  const handleSearch = async (
    searchQuery,
    setSearchResults,
    setShowNoResults
  ) => {
    if (searchQuery.trim() === "") {
      // If search query is empty, reset searchResults and showNoResults
      setSearchResults([]);
      setShowNoResults(false);
      return;
    }
    try {
      const q = query(
        collection(db, "News"), // Replace 'News' with your collection name
        orderBy("Title"),
        where("Title", ">=", searchQuery),
        where("Title", "<=", searchQuery + "\uf8ff"),
        orderBy("PublishDate", "desc"),
        limit(5)
      );

      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (results.length === 0) {
        setShowNoResults(true); // Show "No results" message if searchResults is empty
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for news:", error);
    }
  };

  const getSpecificNews = async (newsId) => {
    try {
      const newsRef = doc(db, "News", newsId);

      const docSnapshot = await getDoc(newsRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const result = { id: docSnapshot.id, ...data };

        // Update your state with the fetched news article
        setData((prevData) => ({
          ...prevData,
          groupedData: {
            ...prevData.groupedData,
            [result.category]: [
              ...(prevData.groupedData[result.category] || []),
              result,
            ],
          },
        }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error searching for news:", error);
    }
  };

  const getRelatedNews = async (relatedNewsItems) => {
    if (!Array.isArray(relatedNewsItems) || relatedNewsItems.length === 0) {
      return;
    }

    try {
      let NewsQuery = query(
        collection(db, "News"),
        orderBy("NewsID"),
        where("NewsID", "in", relatedNewsItems)
      );

      // Fetch additional news
      const NewsSnapshot = await getDocs(NewsQuery);
      const NewsData = NewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NewsData;
    } catch (error) {
      console.error("Error fetching additional news:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  const getAds = async (setVideoUrl) => {
    const storageRef = ref(
      storage,
      // `gs://directmedia-6b77f.appspot.com/ads/Al Shark Promo.mp4` // Append the timestamp to the image name
      `gs://directmedia-6b77f.appspot.com/ads/Al Shark Promo.webm`
    );

    try {
      // Get the download URL for the video
      const url = await getDownloadURL(storageRef);
      setVideoUrl(url);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching video:", error);
    }
  };

  const getIPTLogo = async (setIPTLogo) => {
    const storageRef = ref(
      storage,
      // `gs://directmedia-6b77f.appspot.com/ads/Al Shark Promo.mp4` // Append the timestamp to the image name
      `gs://directmedia-6b77f.appspot.com/ads/IPT Logo.png`
    );

    try {
      // Get the download URL for the video
      const url = await getDownloadURL(storageRef);
      setIPTLogo(url);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching video:", error);
    }
  };
  return (
    <FirestoreContext.Provider
      value={{
        ...data,
        loading,
        fetchMoreNews,
        fetchAllNews,
        fetchRelatedNews,
        handleSearch,
        getSpecificNews,
        getRelatedNews,
        getAds,
        getIPTLogo,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;

// Utility function for processing News data
function processNewsData(snapshot) {
  const newsItems = [];

  // Loop over each document in the snapshot
  snapshot.forEach((doc) => {
    const data = doc.data();
    newsItems.push({
      id: doc.id,
      ...data,
    });
  });

  // Prepare the data to be returned
  const processedData = {
    newsData: newsItems,
  };

  return processedData;
}

function processCategoryNews(snapshot, category) {
  const newsItems = [];

  // Loop over each document in the snapshot
  snapshot.forEach((doc) => {
    const data = doc.data();
    newsItems.push({
      id: doc.id,
      ...data,
    });
  });

  const groupedData = {
    [category]: newsItems,
  };

  // Prepare the data to be returned
  const processedData = {
    groupedData: groupedData,
  };

  return processedData;
}

async function processProgramsData(snapshot) {
  const programs = [];

  // Accumulate the CaseInOneProgram episodes
  let CaseInOneProgramEpisodes = [];

  const promises = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    const program = {
      id: doc.id,
      ...data,
    };

    programs.push(program);

    // If the program title matches "قضية بدقيقة", handle the fetching of episodes
    if (program.Title === "قضية بدقيقة") {
      const programsIDArray = program.ProgramsID || [];

      // Fetch episodes only if there are IDs to query
      if (programsIDArray.length > 0) {
        const q = query(
          collection(db, "ProgramsEpisodes"),
          where("EpisodeID", "in", programsIDArray)
        );

        const querySnapshot = await getDocs(q);
        // Append the fetched episodes to the CaseInOneProgramEpisodes array
        CaseInOneProgramEpisodes = querySnapshot.docs.map((episodeDoc) => ({
          ...episodeDoc.data(),
          id: episodeDoc.id,
        }));
      }
    }
  });

  // Wait for all promises to complete
  await Promise.all(promises);

  // Prepare the processed data to be returned
  const processedData = {
    programsData: programs, // This will contain all program data
    groupedProgramsData: CaseInOneProgramEpisodes, // This will contain episodes for "قضية بدقيقة"
  };

  return processedData;
}

async function processWritersData(snapshot) {
  const writers = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    writers.push({
      id: doc.id,
      ...data,
    });
  });

  return writers;
}

async function processArticlesData(snapshot) {
  const articles = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    articles.push({
      id: doc.id,
      ...data,
    });
  });

  return articles;
}

async function processPodcastsData(snapshot) {
  const podcast = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    podcast.push({
      id: doc.id,
      ...data,
    });
  });

  return podcast;
}

async function processPodcastsDataEpisodes(snapshot) {
  const episodes = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.YouTubeURL) {
      try {
        const videoUrl = new URL(data.YouTubeURL);
        const isShortsVideo = videoUrl.pathname.includes("/shorts/");
        let videoId;

        if (isShortsVideo) {
          videoId = videoUrl.pathname.split("/shorts/")[1];
        } else if (videoUrl.hostname === "youtu.be") {
          videoId = videoUrl.pathname.split("/")[1];
        } else {
          videoId = videoUrl.searchParams.get("v");
        }

        if (videoId) {
          data.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
        }
      } catch (error) {
        console.error("Error parsing YouTube URL:", error);
      }
    }

    episodes.push({
      id: doc.id,
      ...data,
    });
  });

  episodes.sort((a, b) => {
    const dateA = a.PublishDate ? a.PublishDate.toDate() : new Date(0);
    const dateB = b.PublishDate ? b.PublishDate.toDate() : new Date(0);
    return dateB - dateA;
  });

  return episodes;
}

async function processPorogramssDataEpisodes(snapshot) {
  const episodes = [];

  // Loop over each document in the snapshot
  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.YoutubeLink) {
      try {
        let videoId;
        const videoUrl = new URL(data.YoutubeLink);
        const isShortsVideo = videoUrl.pathname.includes("/shorts/");

        if (isShortsVideo) {
          videoId = videoUrl.pathname.split("/shorts/")[1];
        } else if (videoUrl.hostname === "youtu.be") {
          videoId = videoUrl.pathname.split("/")[1];
        } else {
          videoId = videoUrl.searchParams.get("v");
        }

        if (videoId) {
          data.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
        } else {
          console.log("There is error in the URL: " + videoId);
        }
      } catch (error) {
        console.error("Error parsing YouTube Link:", error);
      }
    }

    episodes.push({
      id: doc.id,
      ...data,
    });
  });

  episodes.sort((a, b) => {
    const dateA = a.PublishDate ? a.PublishDate.toDate() : new Date(0);
    const dateB = b.PublishDate ? b.PublishDate.toDate() : new Date(0);
    return dateB - dateA;
  });

  return episodes;
}

async function processCategoriesData(snapshot) {
  const categories = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    categories.push({
      id: doc.id,
      title: data.Name,
    });
  });

  return categories;
}
