import React, { useState, useEffect, useContext } from "react";

import useStyles from "./styles";

import { Container, Tab, Tabs } from "@mui/material";
import FirestoreContext from "../../Utils/FirestoreContext";

import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";

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

  const {
    relatedNewsOptions,
    distinctNewsCategory,
    distinctWritersName,
    distinctProgram,
    distinctPodcast,
  } = useContext(FirestoreContext);

  const categories = [
    { value: "خبر عاجل", label: "خبر عاجل" },
    { value: "محلي", label: "محلي" },
    { value: "صحافة", label: "صحافة" },
    { value: "دولي", label: "دولي" },
  ];
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedAction, setSelectedAction] = useState("إضافة");

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
  };

  const insertFormProps = {
    activeTab: activeTab,
    SuspenseFallback: SuspenseFallback,
    NewsEntryLazy: NewsEntryLazy,
    ArticlesEntryLazy: ArticlesEntryLazy,
    ProgramsEntryLazy: ProgramsEntryLazy,
    PodcastEntryLazy: PodcastEntryLazy,
    distinctNewsCategory: distinctNewsCategory,
    relatedNewsOptions: relatedNewsOptions,
    categories: categories,
    distinctWritersName: distinctWritersName,
    distinctProgram: distinctProgram,
    distinctPodcast: distinctPodcast,
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
            {/* Need to be handle later */}

            {/* <span
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
            </span> */}
          </div>

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
