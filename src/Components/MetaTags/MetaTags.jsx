import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({
  title,
  titleName,
  description,
  imageUrl,
  url,
  hashtags,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <link rel="image_src" href={imageUrl} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:hashtags" content={hashtags} />
      <meta property="og:keywords" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content={imageUrl} />
      <meta name="twitter:title" content={titleName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={url} />
      <meta property="fb:app_id" content="368248832226741" />
      <meta property="fb:page_id" content="Ps3k5ia7zo4ze" />
    </Helmet>
  );
};

export default MetaTags;
