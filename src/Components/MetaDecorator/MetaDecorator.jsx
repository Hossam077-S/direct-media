import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ Title, Description, ImageURL, Hashtags }) => {
  return (
    <Helmet>
      <meta property="og:title" content={Title} />
      <meta name="description" content={Description} />
      <meta property="og:description" content={Description} />
      <meta property="og:image" content={ImageURL} />
      <meta property="og:hashtags" content={Hashtags} />
      <meta
        property="og:url"
        content={window.location.pathname + window.location.search}
      />
      <meta name="twitter:card" content={ImageURL} />
      <meta name="twitter:title" content={Title} />
      <meta name="twitter:description" content={Description} />
      <meta name="twitter:image" content={ImageURL} />
      <meta name="twitter:image:alt" content={Title} />
      <meta property="og:image:secure_url" content={ImageURL} />
      <link rel="image_src" href={ImageURL} />
      <meta property="og:keywords" content="Explore and share news" />
    </Helmet>
  );
};

export default MetaDecorator;
