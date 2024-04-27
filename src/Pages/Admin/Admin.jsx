import React, { useState, useEffect, useContext } from "react";

import useStyles from "./styles";

import { Container, Tab, Tabs } from "@mui/material";
import FirestoreContext from "../../Utils/FirestoreContext2";

import { SuspenseFallback2 } from "../../Components/SuspenseFallback/SuspenseFallback2";

import SignInForm from "../../Components/SignInForm/SignInForm";

import InsertForm from "./InsertForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

const NewsEntryLazy = React.lazy(() => import("./NewsEntry"));
const ArticlesEntryLazy = React.lazy(() => import("./ArticlesEntry"));
const ProgramsEntryLazy = React.lazy(() => import("./ProgramsEntry"));
const PodcastEntryLazy = React.lazy(() => import("./PodcastEntry"));

const Admin = () => {
  const [login, setLogin] = useState(false);
  const [articlesOptions, setArticlesOptions] = useState([]);
  const [ProgramsName, setProgramsName] = useState([]);
  const [PodcastsName, setPodcastsName] = useState([]);
  const [WritersName, setWritersName] = useState([]);

  const {
    newsData,
    programsData,
    writersData,
    articlesData,
    podcastData,
    newsCategoreis,
  } = useContext(FirestoreContext);

  const categories = [
    { value: "عاجل", label: "عاجل" },
    { value: "محلي", label: "محلي" },
    { value: "صحافة", label: "صحافة" },
    { value: "دولي", label: "دولي" },
  ];
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedAction, setSelectedAction] = useState("إضافة");

  useEffect(() => {
    // For article titles
    if (articlesData) {
      const articleTitles = articlesData.map((article) => ({
        title: article.Text,
        id: article.ArticleID,
      }));
      setArticlesOptions(articleTitles);
    }

    // For program names
    if (programsData) {
      const programNames = programsData.map((program) => ({
        title: program.Title,
        id: program.ProgramID,
      }));
      setProgramsName(programNames);
    }

    // For podcast names
    if (podcastData) {
      const podcastNames = podcastData.map((podcast) => ({
        title: podcast.Title,
        id: podcast.PodcastID,
      }));
      setPodcastsName(podcastNames);
    }

    // For writer names
    if (writersData) {
      const writerNames = writersData.map((writer) => ({
        title: writer.Name,
        id: writer.WriterID,
      }));
      setWritersName(writerNames);
    }
  }, [newsData, articlesData, programsData, podcastData, writersData]); // Re-run when this data changes

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setLogin(true);
    } else {
      console.log("User not found in local storage");
    }
  }, []);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setActiveTab(0); // Reset to the first tab when action changes
  };

  const insertFormProps = {
    activeTab: activeTab,
    SuspenseFallback: SuspenseFallback2,
    NewsEntryLazy: NewsEntryLazy,
    ArticlesEntryLazy: ArticlesEntryLazy,
    ProgramsEntryLazy: ProgramsEntryLazy,
    PodcastEntryLazy: PodcastEntryLazy,
    NewsCategory: newsCategoreis,
    articlesOptions: articlesOptions,
    categories: categories,
    WritersName: WritersName,
    ProgramsName: ProgramsName,
    PodcastsName: PodcastsName,
  };

  return (
    <>
      {login ? (
        <Container className={classes.container}>
          <div className={classes.options}>
            <span
              className={selectedAction === "إضافة" ? classes.activeOption : ""}
              onClick={() => handleActionClick("إضافة")}
            >
              إضافة
            </span>
            <span
              className={selectedAction === "تعديل" ? classes.activeOption : ""}
              onClick={() => handleActionClick("تعديل")}
            >
              تعديل
            </span>
            <span
              className={selectedAction === "حذف" ? classes.activeOption : ""}
              onClick={() => handleActionClick("حذف")}
            >
              حذف
            </span>
          </div>

          {selectedAction !== "تعديل" ? (
            <Tabs
              value={activeTab}
              onChange={(event, newValue) => setActiveTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              className={classes.Tabs}
            >
              <Tab className={classes.Tab} label="خبر" />
              <Tab className={classes.Tab} label="مقال" />
              <Tab className={classes.Tab} label="برنامج" />
              <Tab className={classes.Tab} label="بودكاست" />
            </Tabs>
          ) : (
            <Tabs
              value={activeTab}
              onChange={(event, newValue) => setActiveTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              className={classes.Tabs}
            >
              <Tab className={classes.Tab} label="خبر" />
              <Tab className={classes.Tab} label="مقال" />
              <Tab className={classes.Tab} label="كاتب" />
            </Tabs>
          )}

          {selectedAction === "إضافة" && <InsertForm {...insertFormProps} />}
          {selectedAction === "تعديل" && <UpdateForm {...insertFormProps} />}
          {selectedAction === "حذف" && <DeleteForm {...insertFormProps} />}
        </Container>
      ) : (
        <SignInForm setLogin={setLogin} />
      )}
    </>
  );
};

export default Admin;
