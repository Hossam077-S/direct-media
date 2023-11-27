import React from "react";
import { Container, Typography } from "@mui/material";

import MetaTags from "../../Components/MetaTags/MetaTags";

import useStyles from "./styles";
import { analytics, logEvent } from "../../Utils/firebase";

logEvent(analytics, "page_view", {
  page_title: "PrivacyPolicy",
  page_location: "privacy",
});

function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <MetaTags
        title="Writer Page"
        titleName="Discover the our privacy"
        description="Explore and descover the world"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83"
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <Typography variant="h4" gutterBottom className={classes.TypoHeader}>
        سياسة الخصوصية
      </Typography>
      <Typography variant="body1" paragraph className={classes.TypoParag}>
        مرحبًا بك في DirectMedia. نحن نهتم بخصوصيتك ونعمل جاهدين لحماية معلوماتك
        الشخصية. يرجى قراءة سياسة الخصوصية هذه بعناية لفهم كيفية جمع واستخدام
        وحماية معلوماتك الشخصية.
      </Typography>
      <Typography variant="h6" gutterBottom className={classes.TypoParag}>
        تاريخ آخر تحديث: 9/4/2023
      </Typography>
      <Typography variant="body1" paragraph className={classes.TypoParag}>
        1. جمع المعلومات الشخصية:
      </Typography>
      <Typography variant="body1" paragraph className={classes.TypoParag}>
        عند استخدام موقعنا أو تطبيقنا، قد نجمع معلومات شخصية منك. هذه المعلومات
        يمكن أن تشمل:
      </Typography>
      <ul>
        <li>الاسم</li>
        <li>عنوان البريد الإلكتروني</li>
        <li>معلومات الاتصال</li>
        <li>معلومات التسجيل (إذا كنت مسجلًا لدينا)</li>
        <li>معلومات الدفع (إذا كنت تقدم معلومات دفع)</li>
      </ul>
      <Typography variant="body1" paragraph className={classes.TypoParag}>
        2. استخدام المعلومات الشخصية:
      </Typography>
      <Typography variant="body1" paragraph className={classes.TypoParag}>
        نحن نستخدم معلوماتك الشخصية لأغراض معينة، مثل:
      </Typography>
      <ul>
        <li>تقديم الخدمات التي تطلبها منا</li>
        <li>تحسين خدماتنا وتجربة المستخدم</li>
        <li>التواصل معك وتقديم الدعم</li>
        <li>تخصيص محتوى وإعلانات الموقع</li>
      </ul>
      {/* Continue with the rest of your privacy policy content */}
    </Container>
  );
}

export default PrivacyPolicy;
