import { useState } from "react";

const ConvertImageWebp = () => {
  const [convertedImage, setConvertedImage] = useState(null);
  const [convertedCover, setConvertedCover] = useState(null);

  const convertImageToWebP = async (file, image) => {
    if (!file) return;

    if (file.type === "image/webp") {
      if (image === "image") {
        setConvertedImage(file);
      } else {
        setConvertedCover(file);
      }
    } else {
      try {
        const imageBitmap = await createImageBitmap(file);

        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0);

        canvas.toBlob((webpBlob) => {
          if (webpBlob) {
            if (image === "image") {
              setConvertedImage(new Blob([webpBlob], { type: "image/webp" }));
            } else {
              setConvertedCover(new Blob([webpBlob], { type: "image/webp" }));
            }
          }
        }, "image/webp");
      } catch (error) {
        console.error("Error converting image to WebP:", error);
        setConvertedImage(null);
        setConvertedCover(null);
      }
    }
  };

  return {
    convertedImage,
    convertedCover,
    convertImageToWebP,
  };
};

export default ConvertImageWebp;
