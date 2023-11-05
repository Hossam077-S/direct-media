import React from "react";

const InsertForm = (insertFormProps) => {
  return (
    <div>
      {insertFormProps.activeTab === 0 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <insertFormProps.NewsEntryLazy
            distinctNewsCategory={insertFormProps.NewsCategory}
            relatedNewsOptions={insertFormProps.NewsOptions}
            categories={insertFormProps.categories}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 1 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <insertFormProps.ArticlesEntryLazy
            distinctWritersName={insertFormProps.WritersName}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 2 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <insertFormProps.ProgramsEntryLazy
            distinctProgram={insertFormProps.ProgramsName}
          />
        </React.Suspense>
      )}
      {insertFormProps.activeTab === 3 && (
        <React.Suspense
          fallback={<insertFormProps.SuspenseFallback cName="progress" />}
        >
          <insertFormProps.PodcastEntryLazy
            distinctPodcast={insertFormProps.PodcastsName}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default InsertForm;
