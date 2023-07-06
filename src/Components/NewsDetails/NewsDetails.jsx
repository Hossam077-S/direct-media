import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const NewsDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    // dispatch(getPost(id));
  }, [id]);

  return <div>id is : {id}</div>;
};

export default NewsDetails;
