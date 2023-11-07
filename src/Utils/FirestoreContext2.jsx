import React, { createContext, useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "../Utils/firebase";

import { SuspenseFallback } from "../Components/SuspenseFallback/SuspenseFallback";

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    news: true,
    programs: true,
    writers: true,
    articles: true,
    podcasts: true,
    podcastsEpisodes: true,
    programsEpisodes: true,
    newsCategoreis: true,
  });

  const [data, setData] = useState({
    newsData: [],
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

  // Helper function to handle state updates for each data type
  const updateData = (type, newData) => {
    setData((prevData) => ({ ...prevData, [type]: newData }));
  };

  // Combine useEffects when possible to minimize subscriptions
  useEffect(() => {
    const unsubscribeNews = subscribeToNews(updateData);
    const unsubscribePrograms = subscribeToPrograms(updateData);
    const unsubscribeWriters = subscribeToWriters(updateData);
    const unsubscribeArticles = subscribeToArticles(updateData);
    const unsubscribePodcast = subscribeToPodcasts(updateData);
    const unsubscribePodcastEpisodes = subscribeToPodcastsEpisodes(updateData);
    const unsubscribeProgramsEpisodes = subscribeToProgramsEpisodes(updateData);
    const unsubscribeNewsCategory = subscribeToNewsCategory(updateData);

    // Cleanup function to unsubscribe from collections
    return () => {
      unsubscribeNews();
      unsubscribePrograms();
      unsubscribeWriters();
      unsubscribeArticles();
      unsubscribePodcast();
      unsubscribePodcastEpisodes();
      unsubscribeProgramsEpisodes();
      unsubscribeNewsCategory();
    };
  }, []);

  const allDataLoaded = !Object.values(loading).some((isLoading) => isLoading);

  // Modularized subscription functions for reuse and simplified useEffects
  const subscribeToNews = (updateData) => {
    return onSnapshot(collection(db, "News"), async (snapshot) => {
      const processedData = await processNewsData(snapshot);
      updateData("newsData", processedData.newsData); // Update the news data
      updateData("groupedData", processedData.groupedData); // Update the grouped data
      setLoading((prev) => ({ ...prev, news: false }));
    });
  };

  const subscribeToPrograms = (updateData) => {
    return onSnapshot(collection(db, "Programs"), async (snapshot) => {
      const processedData = await processProgramsData(snapshot);
      updateData("programsData", processedData.programsData); // Update the programs data
      updateData("groupedProgramsData", processedData.groupedProgramsData); // Update the grouped programs data
      setLoading((prev) => ({ ...prev, programs: false }));
    });
  };

  const subscribeToWriters = (updateData) => {
    return onSnapshot(collection(db, "Writers"), async (snapshot) => {
      const processedWriters = await processWritersData(snapshot);
      updateData("writersData", processedWriters);
      setLoading((prev) => ({ ...prev, writers: false }));
    });
  };

  const subscribeToArticles = (updateData) => {
    return onSnapshot(collection(db, "Articles"), async (snapshot) => {
      const processedArticles = await processArticlesData(snapshot); // You would define processArticlesData
      updateData("articlesData", processedArticles);
      setLoading((prev) => ({ ...prev, articles: false }));
    });
  };

  const subscribeToPodcasts = (updateData) => {
    return onSnapshot(collection(db, "Podcast"), async (snapshot) => {
      const processedPodcasts = await processPodcastsData(snapshot); // Wait for the data to be processed
      updateData("podcastData", processedPodcasts);
      setLoading((prev) => ({ ...prev, podcasts: false }));
    });
  };

  const subscribeToPodcastsEpisodes = (updateData) => {
    return onSnapshot(collection(db, "PodcastEpisodes"), async (snapshot) => {
      const processedPodcasts = await processPodcastsDataEpisodes(snapshot); // Wait for the data to be processed
      updateData("podcastDataEpisodes", processedPodcasts);
      setLoading((prev) => ({ ...prev, podcastsEpisodes: false }));
    });
  };

  const subscribeToProgramsEpisodes = (updateData) => {
    return onSnapshot(collection(db, "ProgramsEpisodes"), async (snapshot) => {
      const processedPrograms = await processPorogramssDataEpisodes(snapshot); // Wait for the data to be processed
      updateData("programsDataEpisodes", processedPrograms);
      setLoading((prev) => ({ ...prev, programsEpisodes: false }));
    });
  };

  const subscribeToNewsCategory = (updateData) => {
    return onSnapshot(collection(db, "Categories"), async (snapshot) => {
      const processedCategories = await processCategoriesData(snapshot); // You would define processArticlesData
      updateData("newsCategoreis", processedCategories);
      setLoading((prev) => ({ ...prev, newsCategoreis: false }));
    });
  };

  return (
    <FirestoreContext.Provider value={{ ...data, loading }}>
      {allDataLoaded ? children : <SuspenseFallback cName="dots" />}
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

  // Sort news items by publish date
  newsItems.sort((a, b) => b.PublishDate.toDate() - a.PublishDate.toDate());

  // Filter news by categories using the limited array
  const ImportantNews = newsItems.filter((m) => m.Category === "خبر عاجل");
  const pressNews = newsItems.filter((m) => m.Category === "صحافة");
  const localNews = newsItems.filter((m) => m.Category === "محلي");
  const internationalNews = newsItems.filter((m) => m.Category === "دولي");
  const sport = newsItems.filter((m) => m.Category === "رياضة");

  // Function to group news by a given number of items
  const groupNewsByNumber = (newsArray, numberOfItems) => {
    const grouped = [];
    const copyOfNews = [...newsArray]; // make a copy to not mutate the original array
    while (copyOfNews.length > 0) {
      grouped.push(copyOfNews.splice(0, numberOfItems));
    }
    return grouped;
  };

  const p1 = groupNewsByNumber(pressNews, 5);

  // Function to slice the number of items in an array
  const sliceItems = (newsArray, numberOfItems) => {
    return newsArray.slice(0, numberOfItems);
  };

  // Group news by categories with the specified number of items
  const groupedData = {
    press: p1,
    press2: pressNews,
    local: groupNewsByNumber(localNews, 5),
    local2: localNews,
    inter: groupNewsByNumber(internationalNews, 5),
    inter2: internationalNews,
    important: ImportantNews,
    sport: sliceItems(sport, 20),
    limitedNews: sliceItems(newsItems, 20),
  };

  // Prepare the data to be returned
  const processedData = {
    newsData: newsItems, // If you want the entire component to use only limited items
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

  // Loop over each document in the snapshot
  snapshot.forEach((doc) => {
    const data = doc.data();

    // Check if YouTubeURL exists for the current episodes and try to extract the thumbnail
    if (data.YouTubeURL) {
      try {
        const videoUrl = new URL(data.YouTubeURL);
        const videoId = videoUrl.searchParams.get("v");
        // Assign the thumbnail URL directly to the data object
        data.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
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
