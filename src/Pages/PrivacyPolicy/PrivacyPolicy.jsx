import React from "react";
import { Container, Typography } from "@mui/material";

import useStyles from "./styles";

function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
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
