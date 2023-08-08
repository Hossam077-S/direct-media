import React, { useState, useEffect } from "react";

import { db, collection, onSnapshot, auth } from "../../Utils/firebase";

import useStyles from "./styles";

import { Button, Container, Tab, Tabs, TextField } from "@mui/material";
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

  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [user, setUser] = useState(null);

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

  // const handleSignIn = async () => {
  //   try {
  //     await auth.signInWithEmailAndPassword(email, password);
  //     setUser(auth.currentUser);
  //   } catch (error) {
  //     console.error("Error signing in:", error.message);
  //   }
  // };

  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //     setUser(null);
  //   } catch (error) {
  //     console.error("Error signing out:", error.message);
  //   }
  // };

  return (
    <Container className={classes.container}>
      {/* {user ? (
        <> */}
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
      {/* <Button
            variant="contained"
            color="primary"
            onClick={handleSignOut}
            style={{ marginTop: "20px" }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "#2E3190" }}>
            تسجبل الدخول:
          </h1>
          <div className={classes.loginForm}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignIn}
              style={{ marginTop: "20px" }}
            >
              دخول
            </Button>
          </div>
        </div>
      )} */}
    </Container>
  );
};

export default Admin;
