const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");

const axios = require("axios");
const sharp = require("sharp");

// const puppeteer = require("puppeteer");

// function isCrawler(userAgent) {
//   // Simple check for common crawler user agents
//   const crawlerUserAgents = /googlebot|bingbot|yandex|baiduspider/i;
//   return crawlerUserAgents.test(userAgent);
// }

// async function renderPageForCrawlers(req, res, next) {
//   if (isCrawler(req.headers["user-agent"])) {
//     const url = `https://www.directmedialb.com${req.originalUrl}`;

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: "networkidle2" });

//     const content = await page.content();
//     await browser.close();

//     return res.send(content);
//   } else {
//     next();
//   }
// }

// If using environment variable for the service account

// const prerender = require("prerender-node").set(
//   "prerenderToken",
//   "4CngKWD2GFrBVevrfJmX"
// );

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

// app.use(renderPageForCrawlers);
// app.use(prerender);

// static resources should just be served as they are

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

      // inject meta tags
      htmlData = htmlData
        .replace("<title>Direct Media</title>", `<title>News Details</title>`)
        .replace("__META_OG_TITLE__", truncate(news.Title, 55))
        .replace("__META_OG_TITLE_T__", truncate(news.Title, 55))

        .replace("__META_OG_DESCRIPTION__", truncate(news.Description, 65))
        .replace("__META_DESCRIPTION__", truncate(news.Description, 65))
        .replace("__META_DESCRIPTION_T__", truncate(news.Description, 65))

        .replace("__META_OG_IMAGE_1__", imageUrlToUse)
        .replace("__META_OG_IMAGE_2__", imageUrlToUse)
        .replace("__META_OG_IMAGE_3__", imageUrlToUse)
        .replace("__META_OG_IMAGE_T__", imageUrlToUse)

        .replace("__META_OG_IMAGE_WIDTH__", "1200")
        .replace("__META_OG_IMAGE_HEIGHT__", "630")

        .replace("__META_OG_HASHTAGS__", news.Hashtag || "#أخبار")
        .replace("__META_OG_KEYWORDS__", news.Title)

        .replace("__META_OG_URL__", fullUrl)
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

      // inject meta tags
      htmlData = htmlData
        .replace(
          "<title>Direct Media</title>",
          `<title>Article Details</title>`
        )
        .replace("__META_OG_TITLE__", truncate(article.Text, 55))
        .replace("__META_OG_TITLE_T__", "Direct Media")

        .replace("__META_OG_DESCRIPTION__", truncate(article.Content, 65))
        .replace("__META_DESCRIPTION__", truncate(article.Content, 65))
        .replace("__META_DESCRIPTION_T__", truncate(article.Content, 65))

        .replace("__META_OG_IMAGE_1__", imageUrlToUse)
        .replace("__META_OG_IMAGE_2__", imageUrlToUse)
        .replace("__META_OG_IMAGE_3__", imageUrlToUse)
        .replace("__META_OG_IMAGE_T__", imageUrlToUse)

        .replace("__META_OG_IMAGE_WIDTH__", "1200")
        .replace("__META_OG_IMAGE_HEIGHT__", "630")

        .replace("__META_OG_HASHTAGS__", article.Hashtag || "#أخبار")
        .replace("__META_OG_KEYWORDS__", article.Text)

        .replace("__META_OG_URL__", fullUrl)
        .replace("__META_OG_URL_CANO__", fullUrl);

      return res.send(htmlData);
    });
  } catch (error) {
    console.error("Error fetching document: ", error);
    res.status(500).send("Internal Server Error");
  }
});
// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});

module.exports = app;
