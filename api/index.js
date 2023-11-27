const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");

const axios = require("axios");
const sharp = require("sharp");

const sanitizeHtml = require("sanitize-html");

const serviceAccountPath = path.join(
  __dirname,
  "../serviceAccountKey/serviceAccountKey.json"
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://directmedia-6b77f.appspot.com/", // Replace with your actual bucket name
});

// Initialize Firebase Storage

const PORT = process.env.PORT || 8080;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

async function processImageForSocialMedia(url) {
  const desiredAspectRatio = 1.91; // Common aspect ratio for social media

  try {
    // Step 1: Download the image
    const response = await axios({
      method: "get",
      url: url,
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data, "binary");

    // Step 2: Check and adjust aspect ratio
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const currentAspectRatio = metadata.width / metadata.height;

    if (currentAspectRatio !== desiredAspectRatio) {
      const resizedImageBuffer = await image
        .resize(metadata.width, Math.round(metadata.width / desiredAspectRatio))
        .toBuffer();

      // Extract filename from original URL
      const urlParts = url.split("/");
      const originalFileName = urlParts[urlParts.length - 1].split("?")[0]; // Remove any query parameters

      // Step 3: Upload the processed image to Firebase Storage
      const bucket = admin.storage().bucket(); // Use the default bucket
      const filePath = `meta_images/${originalFileName}`;
      const file = bucket.file(filePath);

      await file.save(resizedImageBuffer, {
        contentType: "image/jpeg",
      });

      // Make the file publicly readable (optional, if you want to use public URL without token)
      await file.makePublic();

      // Step 4: Generate a signed URL (with token)
      const signedUrls = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // far future date
      });

      const publicUrlWithToken = signedUrls[0];
      return publicUrlWithToken;
    }

    return null; // No resizing needed
  } catch (error) {
    console.error("Error processing image: ", error);
    throw error;
  }
}

// here we serve the index.html page for news
app.get("/news/:id", async (req, res) => {
  const id = req.params.id; // Extracts the ID from the URL path
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  if (!id || typeof id !== "string") {
    return res.status(400).send("Invalid ID provided");
  }

  try {
    const db = admin.firestore();
    const doc = await db.collection("News").doc(id).get();
    if (!doc.exists) {
      return res.status(404).send("News not found");
    }

    const news = doc.data();

    const processedImageUrl = await processImageForSocialMedia(news.ImageURL);

    fs.readFile(indexPath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }

      const imageUrlToUse = processedImageUrl || news.ImageURL;

      const textDescription = sanitizeHtml(truncate(news.Description, 65), {
        allowedTags: [], // Allow no tags
        allowedAttributes: {}, // Allow no attributes
      });

      // inject meta tags
      htmlData = htmlData
        .replace("<title>Direct Media</title>", `<title>News Details</title>`)
        .replace(
          "Direct Media - Your Source for News",
          truncate(news.Title, 55)
        )
        .replace(
          "Direct Media - Your Source for News - Tweet",
          truncate(news.Title, 55)
        )

        .replace(
          "اكتشف آخر الأخبار والتحليلات العميقة في عالم الإعلام مع مصدرك الموثوق للأخبار المحلية والعالمية - Direct Media",
          textDescription
        )
        .replace(
          "ابق على اطلاع بأحدث الأخبار والرؤى الإعلامية",
          textDescription
        )
        .replace(
          "ابق على اطلاع بأحدث الأخبار والرؤى الإعلامية - Direct Media",
          textDescription
        )

        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83",
          imageUrlToUse
        )
        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FWhiteLogo.gif?alt=media&token=2de8da7f-7257-4946-abdf-693190eb67cf",
          imageUrlToUse
        )
        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FpodcastLogo.gif?alt=media&token=d92b7eb6-b228-4153-8bc2-3cb646248e43",
          imageUrlToUse
        )
        .replace("__META_OG_IMAGE_T__", imageUrlToUse)

        .replace("1200", "1200")
        .replace("630", "630")

        .replace("#News #Articles #Podcasts #Writers", news.Hashtag || "#أخبار")
        .replace(
          "News, Articles, Podcasts, Writers, World, Lebanon, Sport",
          news.Title
        )

        .replace("https://www.directmedialb.com", fullUrl)
        .replace("__META_OG_URL_CANO__", fullUrl);

      return res.send(htmlData);
    });
  } catch (error) {
    console.error("Error fetching document: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// here we serve the index.html page for article
app.get("/article/:id", async (req, res) => {
  const id = req.params.id; // Extracts the ID from the URL path
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  if (!id || typeof id !== "string") {
    return res.status(400).send("Invalid ID provided");
  }

  try {
    const db = admin.firestore();
    const doc = await db.collection("Articles").doc(id).get();
    if (!doc.exists) {
      return res.status(404).send("Articles not found");
    }

    const article = doc.data();

    const processedImageUrl = await processImageForSocialMedia(
      article.ImageURL
    );

    fs.readFile(indexPath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }

      const imageUrlToUse = processedImageUrl || article.ImageURL;

      const textDescription = sanitizeHtml(truncate(article.Content, 65), {
        allowedTags: [], // Allow no tags
        allowedAttributes: {}, // Allow no attributes
      });

      // inject meta tags
      htmlData = htmlData
        .replace(
          "<title>Direct Media</title>",
          `<title>Article Details</title>`
        )
        .replace(
          "Direct Media - Your Source for News",
          truncate(article.Text, 55)
        )
        .replace(
          "Direct Media - Your Source for News - Tweet",
          truncate(article.Text, 55)
        )

        .replace(
          "اكتشف آخر الأخبار والتحليلات العميقة في عالم الإعلام مع مصدرك الموثوق للأخبار المحلية والعالمية - Direct Media",
          textDescription
        )
        .replace(
          "ابق على اطلاع بأحدث الأخبار والرؤى الإعلامية",
          textDescription
        )
        .replace(
          "ابق على اطلاع بأحدث الأخبار والرؤى الإعلامية - Direct Media",
          textDescription
        )

        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83",
          imageUrlToUse
        )
        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FWhiteLogo.gif?alt=media&token=2de8da7f-7257-4946-abdf-693190eb67cf",
          imageUrlToUse
        )
        .replace(
          "https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FpodcastLogo.gif?alt=media&token=d92b7eb6-b228-4153-8bc2-3cb646248e43",
          imageUrlToUse
        )
        .replace("__META_OG_IMAGE_T__", imageUrlToUse)

        .replace("1200", "1200")
        .replace("630", "630")

        .replace(
          "#News #Articles #Podcasts #Writers",
          article.Hashtag || "#أخبار"
        )
        .replace(
          "News, Articles, Podcasts, Writers, World, Lebanon, Sport",
          article.Text
        )

        .replace("https://www.directmedialb.com", fullUrl)
        .replace("__META_OG_URL_CANO__", fullUrl);

      return res.send(htmlData);
    });
  } catch (error) {
    console.error("Error fetching document: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});

module.exports = app;
