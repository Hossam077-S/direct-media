import React, { useState } from "react";

import { auth, signInWithEmailAndPassword } from "../../Utils/firebase";

import useStyles from "./styles";
import { CircularProgress } from "@mui/material";

import SnackbarComponent from "../Snackbar/SnackbarComponent";
import { delayAndExecute } from "../../Utils/delayAndExecute";

const SignInForm = ({ setLogin }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setMessage("تم تسجيل الدخول بنجاح");
      setError(false);
      setSnackbar(true);

      delayAndExecute(() => {
        setLogin(true);
      }, 1000);
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء تسجيل الدخول";

      if (error.message === "auth/wrong-password") {
        errorMessage = "كلمة المرور غير صحيحة";
      } else if (error.message === "auth/user-not-found") {
        errorMessage = "البريد الإلكتروني غير مسجل";
      } else {
        errorMessage = "البريد الإلكتروني وكلمة المرور غير مسجله";
      }

      setMessage(errorMessage);
      setError(true);
      setSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.input}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.input}
      />
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        تذكرني
      </label>
      <button onClick={handleSignIn} className={classes.button}>
        {loading ? <CircularProgress size={24} /> : "تسجيل الدخول"}
      </button>
      <SnackbarComponent
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        error={error}
        Message={message}
        errorMessage={message}
      />
    </div>
  );
};

export default SignInForm;
