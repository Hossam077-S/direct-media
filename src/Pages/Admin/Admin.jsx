import React, { useState, useEffect } from "react";

import { db, collection, onSnapshot } from "../../Utils/firebase";

import useStyles from "./styles";

import { Container } from "@mui/material";
import { Tab, Tabs } from "@material-ui/core";
import NewsEntry from "./NewsEntry";
import PodcastEntry from "./PodcastEntry";
import ProgramsEntry from "./ProgramsEntry";
import ArticlesEntry from "./ArticlesEntry";

const Admin = () => {
  const classes = useStyles();

  const categories = [
    { value: "خبر عاجل", label: "خبر عاجل" },
    { value: "محلي", label: "محلي" },
    { value: "صحافة", label: "صحافة" },
    { value: "دولي", label: "دولي" },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [relatedNewsOptions, setRelatedNewsOptions] = useState([]);
  const [distinctProgramTitles, setDistinctProgramTitles] = useState([]);
  const [distinctWritersName, setDistinctWritersName] = useState([]);
  const [distinctNewsCategory, setDistinctNewsCategory] = useState([]);

  // Getting RealtedNews
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "News"), (snapshot) => {
      const relatedNewsOptions = snapshot.docs.map((doc) => doc.data().Title);
      setRelatedNewsOptions(relatedNewsOptions);

      const NewsCategory = new Set(
        snapshot.docs.map((doc) => doc.data().Category)
      );
      setDistinctNewsCategory(Array.from(NewsCategory));
    });
    const unsubscribeProgram = onSnapshot(
      collection(db, "Programs"),
      (snapshot) => {
        const ProgramTitles = new Set(
          snapshot.docs.map((doc) => doc.data().Title)
        );
        setDistinctProgramTitles(Array.from(ProgramTitles));
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

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
      unsubscribeProgram();
      unsubscribeWriters();
    };
  }, []);

  return (
    <Container className={classes.container}>
      <h1 style={{ textAlign: "center", color: "#2E3190" }}>إضافة بينات:</h1>
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
      {activeTab === 0 && (
        <NewsEntry
          distinctNewsCategory={distinctNewsCategory}
          relatedNewsOptions={relatedNewsOptions}
          categories={categories}
        />
      )}
      {activeTab === 1 && (
        <ArticlesEntry distinctWritersName={distinctWritersName} />
      )}
      {activeTab === 2 && (
        <ProgramsEntry distinctProgramTitles={distinctProgramTitles} />
      )}
      {activeTab === 3 && <PodcastEntry />}
    </Container>
  );
};

export default Admin;
