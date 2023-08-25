// import React, { useState, useContext } from "react";

// import useStyles from "./styles";

// import { Container, Tab, Tabs } from "@mui/material";
// import FirestoreContext from "../../Utils/FirestoreContext";

// import NewsEntry from "./NewsEntry";
// import PodcastEntry from "./PodcastEntry";
// import ProgramsEntry from "./ProgramsEntry";
// import ArticlesEntry from "./ArticlesEntry";

// const Admin = () => {
//   const classes = useStyles();

//   const categories = [
//     { value: "خبر عاجل", label: "خبر عاجل" },
//     { value: "محلي", label: "محلي" },
//     { value: "صحافة", label: "صحافة" },
//     { value: "دولي", label: "دولي" },
//   ];

//   const {
//     relatedNewsOptions,
//     distinctNewsCategory,
//     distinctWritersName,
//     distinctProgram,
//     distinctPodcast,
//   } = useContext(FirestoreContext);

//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <Container className={classes.container}>
//       <h1 style={{ textAlign: "center", color: "#2E3190" }}>إضافة بينات:</h1>
//       <Tabs
//         value={activeTab}
//         onChange={(event, newValue) => setActiveTab(newValue)}
//         indicatorColor="primary"
//         textColor="primary"
//         className={classes.Tabs}
//       >
//         <Tab className={classes.Tab} label="خبر" />
//         <Tab className={classes.Tab} label="مقال" />
//         <Tab className={classes.Tab} label="برنامج" />
//         <Tab className={classes.Tab} label="بودكاست" />
//       </Tabs>
//       {activeTab === 0 && (
//         <NewsEntry
//           distinctNewsCategory={distinctNewsCategory}
//           relatedNewsOptions={relatedNewsOptions}
//           categories={categories}
//         />
//       )}
//       {activeTab === 1 && (
//         <ArticlesEntry distinctWritersName={distinctWritersName} />
//       )}
//       {activeTab === 2 && <ProgramsEntry distinctProgram={distinctProgram} />}
//       {activeTab === 3 && <PodcastEntry distinctPodcast={distinctPodcast} />}
//     </Container>
//   );
// };

// export default Admin;
import React, { useState, useContext } from "react";

import useStyles from "./styles";

import { Container, Tab, Tabs } from "@mui/material";
import FirestoreContext from "../../Utils/FirestoreContext";

import { SuspenseFallback } from "../../Components/SuspenseFallback/SuspenseFallback";

const NewsEntryLazy = React.lazy(() => import("./NewsEntry"));
const ArticlesEntryLazy = React.lazy(() => import("./ArticlesEntry"));
const ProgramsEntryLazy = React.lazy(() => import("./ProgramsEntry"));
const PodcastEntryLazy = React.lazy(() => import("./PodcastEntry"));

const Admin = () => {
  const classes = useStyles();

  const categories = [
    { value: "خبر عاجل", label: "خبر عاجل" },
    { value: "محلي", label: "محلي" },
    { value: "صحافة", label: "صحافة" },
    { value: "دولي", label: "دولي" },
  ];

  const {
    relatedNewsOptions,
    distinctNewsCategory,
    distinctWritersName,
    distinctProgram,
    distinctPodcast,
  } = useContext(FirestoreContext);

  const [activeTab, setActiveTab] = useState(0);

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
        <React.Suspense fallback={<SuspenseFallback cName="progress" />}>
          <NewsEntryLazy
            distinctNewsCategory={distinctNewsCategory}
            relatedNewsOptions={relatedNewsOptions}
            categories={categories}
          />
        </React.Suspense>
      )}
      {activeTab === 1 && (
        <React.Suspense fallback={<SuspenseFallback cName="progress" />}>
          <ArticlesEntryLazy distinctWritersName={distinctWritersName} />
        </React.Suspense>
      )}
      {activeTab === 2 && (
        <React.Suspense fallback={<SuspenseFallback cName="progress" />}>
          <ProgramsEntryLazy distinctProgram={distinctProgram} />
        </React.Suspense>
      )}
      {activeTab === 3 && (
        <React.Suspense fallback={<SuspenseFallback cName="progress" />}>
          <PodcastEntryLazy distinctPodcast={distinctPodcast} />
        </React.Suspense>
      )}
    </Container>
  );
};

export default Admin;
