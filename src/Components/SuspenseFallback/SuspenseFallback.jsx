import React from "react";

import useStyles from "./styles";

export const SuspenseFallback = ({ cName }) => {
  const classes = useStyles();

  return (
    <div className={classes.suspenseDiv}>
      <div className={classes[cName]} />
    </div>
  );
};
