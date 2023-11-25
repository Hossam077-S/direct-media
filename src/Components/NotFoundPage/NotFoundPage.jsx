import React from "react";

import useStyles from "./style";

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>الصفحة غير موجودة : 404</h1>
      <p className={classes.description}>
        عذراً، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <a href="/" className={classes.link}>
        العودة إلى الصفحة الرئيسية
      </a>
    </div>
  );
};

export default NotFoundPage;
