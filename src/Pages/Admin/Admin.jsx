import React, { useState, useEffect } from "react";

import { db, collection, onSnapshot } from "../../Utils/firebase";

import useStyles from "./styles";

import { Container } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
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
  const [distinctProgram, setDistinctPrograms] = useState([]);
  const [distinctWritersName, setDistinctWritersName] = useState([]);
  const [distinctNewsCategory, setDistinctNewsCategory] = useState([]);

  // Getting RealtedNews
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
      unsubscribeCategory();
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
      {activeTab === 2 && <ProgramsEntry distinctProgram={distinctProgram} />}
      {activeTab === 3 && <PodcastEntry />}
    </Container>
  );
};

export default Admin;
