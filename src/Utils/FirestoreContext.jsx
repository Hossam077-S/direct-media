import React, { createContext, useState, useEffect } from "react";

import {
  db,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "../Utils/firebase";

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [programsData, setProgramsData] = useState([]);
  const [writersData, setWritersData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);

  const [groupedData, setGrouppedData] = useState({});
  const [groupedProgramsData, setGrouppedProgramsData] = useState({});

  const [latestProgram, setLatestProgram] = useState(null);

  const [relatedNewsOptions, setRelatedNewsOptions] = useState([]);
  const [distinctNewsCategory, setDistinctNewsCategory] = useState([]);
  const [distinctProgram, setDistinctPrograms] = useState([]);
  const [distinctPodcast, setDistinctPodcast] = useState([]);
  const [distinctWritersName, setDistinctWritersName] = useState([]);

  const [searchNews, setSearchNews] = useState([]);

  useEffect(() => {
    const unsubscribeNews = onSnapshot(collection(db, "News"), (snapshot) => {
      const result = snapshot.docs.map((doc) => {
        const x = doc.data();
        x.id = doc.id;
        return x;
      });

      const ImportantNews = result.filter((m) => m.Category === "خبر عاجل");
      const pressNews = result.filter((m) => m.Category === "صحافة");
      const localNews = result.filter((m) => m.Category === "محلي");
      const internationalNews = result.filter((m) => m.Category === "دولي");

      const numberOfItems = 5;

      const groupedImportantNews = [...ImportantNews];

      const groupedPressNews2 = [...pressNews];

      const groupedLocalNews2 = [...localNews];

      const groupedInternationalNews2 = [...internationalNews];

      const groupedPressNews = [];
      while (pressNews.length > 0) {
        groupedPressNews.push(pressNews.splice(0, numberOfItems));
      }

      const groupedLocalNews = [];
      while (localNews.length > 0) {
        groupedLocalNews.push(localNews.splice(0, numberOfItems));
      }

      const groupedInternationalNews = [];
      while (internationalNews.length > 0) {
        groupedInternationalNews.push(
          internationalNews.splice(0, numberOfItems)
        );
      }

      setGrouppedData({
        press: groupedPressNews,
        press2: groupedPressNews2,
        local: groupedLocalNews,
        local2: groupedLocalNews2,
        inter: groupedInternationalNews,
        inter2: groupedInternationalNews2,
        important: groupedImportantNews,
      });

      setNewsData(result);
    });

    return () => {
      unsubscribeNews();
    };
  }, []);

  useEffect(() => {
    const unsubscribeProgrames = onSnapshot(
      collection(db, "Programs"),
      async (snapshot) => {
        const programsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });

        const CaseInOneProgram = programsData.filter(
          (m) => m.Title === "قضية بدقيقة"
        );

        if (CaseInOneProgram) {
          const programsIDArray = CaseInOneProgram[0]?.ProgramsID || [];

          // Create a query to fetch episodes with matching IDs
          if (programsIDArray.length > 0) {
            const q = query(
              collection(db, "ProgramsEpisodes"),
              where("EpisodeID", "in", programsIDArray)
            );

            const querySnapshot = await getDocs(q);

            // Extract the episode data from the query snapshot
            const episodes = querySnapshot.docs.map((doc) => doc.data());

            setGrouppedProgramsData({
              programs: episodes,
            });
          }
        }
        setProgramsData(programsData);
      }
    );

    return () => {
      unsubscribeProgrames();
    };
  }, []);

  useEffect(() => {
    const unsubscribeWriters = onSnapshot(
      collection(db, "Writers"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });

        setWritersData(result);
      }
    );

    return () => {
      unsubscribeWriters();
    };
  }, []);

  useEffect(() => {
    const unsubscribeArticles = onSnapshot(
      collection(db, "Articles"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });
        setArticlesData(result);
      }
    );

    return () => {
      unsubscribeArticles();
    };
  }, []);

  useEffect(() => {
    const unsubscribePodcast = onSnapshot(
      collection(db, "PodcastEpisodes"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;

          if (x.YouTubeURL) {
            const videoUrl = new URL(x?.YouTubeURL);

            const videoId = videoUrl?.searchParams.get("v");

            x.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          }

          return x;
        });
        setPodcastData(result);
      }
    );

    return () => {
      unsubscribePodcast();
    };
  }, []);

  useEffect(() => {
    const sortedPrograms = groupedProgramsData.programs?.sort((a, b) => {
      return new Date(a.PublishDate) - new Date(b.PublishDate);
    });

    const latestProgram = sortedPrograms?.[sortedPrograms.length - 1];

    if (latestProgram && latestProgram.YoutubeLink) {
      let videoId, thumbnailUrl;
      const videoUrl = new URL(latestProgram?.YoutubeLink);
      const isShortsVideo = videoUrl.pathname.includes("/shorts/");

      if (isShortsVideo) {
        videoId = videoUrl.pathname.split("/shorts/")[1];
      } else {
        videoId = videoUrl.searchParams.get("v");
      }

      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      }

      setLatestProgram({ ...latestProgram, videoId, thumbnailUrl });
    }
  }, [groupedProgramsData]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "News"), (snapshot) => {
      const relatedNewsOptions = snapshot.docs.map((doc) => doc.data().Title);
      setRelatedNewsOptions(relatedNewsOptions);
    });

    const unsubscribeCategory = onSnapshot(
      collection(db, "Categories"),
      (snapshot) => {
        const Category = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.Name,
          };
        });
        setDistinctNewsCategory(Category);
      }
    );

    const unsubscribeProgram = onSnapshot(
      collection(db, "Programs"),
      (snapshot) => {
        const programs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // The document ID (program ID)
            title: data.Title, // The program title
          };
        });
        setDistinctPrograms(programs);
      }
    );

    const unsubscribePodcast = onSnapshot(
      collection(db, "Podcast"),
      (snapshot) => {
        const podcast = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // The document ID (program ID)
            title: data.Title, // The program title
          };
        });
        setDistinctPodcast(podcast);
      }
    );

    const unsubscribeWriters = onSnapshot(
      collection(db, "Writers"),
      (snapshot) => {
        const writersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().Name,
        }));
        setDistinctWritersName(writersData);
      }
    );

    const unsubscribeSearch = onSnapshot(collection(db, "News"), (snapshot) => {
      const searchNews = snapshot.docs.map((doc) => {
        const x = doc.data();
        x.id = doc.id;
        return x;
      });

      setSearchNews(searchNews);
    });

    return () => {
      unsubscribe();
      unsubscribeCategory();
      unsubscribeProgram();
      unsubscribePodcast();
      unsubscribeWriters();

      unsubscribeSearch();
    };
  }, []);

  return (
    <FirestoreContext.Provider
      value={{
        newsData,
        programsData,
        writersData,
        articlesData,
        podcastData,
        groupedData,
        latestProgram,
        groupedProgramsData,

        relatedNewsOptions,
        distinctNewsCategory,
        distinctProgram,
        distinctPodcast,
        distinctWritersName,

        searchNews,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;
