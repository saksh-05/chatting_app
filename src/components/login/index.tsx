import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  AuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { socialAuthentication } from "../../config/socialAuthentication";
import { userEmailSchema, userPasswordSchema } from "../../config/validation";
import { auth } from "../../config/firebase-config";
import { SignIn, Btn, SocialLogin, ErrorMessage, Snackbar } from "./styled";
import logo from "../../resources/devchallenges-light.svg";
import email from "../../resources/email.svg";
import lock from "../../resources/lock.svg";
import facebook from "../../resources/Facebook.svg";
import google from "../../resources/Google.svg";
import github from "../../resources/Github.svg";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    confirmError: "",
  });
  const [snackbar, setSnackbar] = useState("");

  const history = useNavigate();

  const handleSocialSignIn = async (provider: AuthProvider) => {
    await socialAuthentication(provider);
    history("/allchannels");
  };
  const validateForm = async () => {
    let emailValid = await userEmailSchema.isValid(login);
    let passwordValid = await userPasswordSchema.isValid(login);
    if (emailValid && passwordValid) {
      setError({
        ...error,
        emailError: "",
        passwordError: "",
      });
      setLogin({
        email: "",
        password: "",
      });
      return true;
    } else {
      if (!emailValid) {
        error.emailError = "Invalid Email";
      } else error.emailError = "";
      if (!passwordValid) {
        error.passwordError = "Length is less than 6";
      } else error.passwordError = "";
      setError({ ...error });

      console.log(error);

      return false;
    }
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      await signInWithEmailAndPassword(auth, login.email, login.password)
        .then((res) => {
          history("/main");
          console.log(res);
        })
        .catch((err) => {
          const error = err instanceof FirebaseError;
          if (error) {
            setSnackbar(err.code.split("/")[1]);
            console.log("error", err.code);
          }
        });
    }
  };

  return (
    <>
      {snackbar !== "" ? (
        <>
          <Snackbar>{snackbar}</Snackbar>
          {setTimeout(() => {
            setSnackbar("");
          }, 3000)}
        </>
      ) : (
        ""
      )}
      <SignIn>
        <div>
          <img src={logo} alt="logo" />
          <h3>Login</h3>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
            style={{
              background: `url(${email}) no-repeat 5px 12px`,
            }}
          />
          <ErrorMessage>{error.emailError}</ErrorMessage>
          <input
            type="password"
            autoComplete="true"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
            style={{
              background: `url(${lock}) no-repeat 5px 12px`,
            }}
          />
          <ErrorMessage>{error.emailError}</ErrorMessage>
          <Btn type="submit">Start coding now</Btn>
        </form>
        <p
          style={{
            color: "#828282",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          or continue with these social profile
        </p>
        <SocialLogin>
          <img
            src={google}
            alt="google"
            onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
            style={{ cursor: "pointer" }}
          />
          <img
            src={facebook}
            alt="facebook"
            onClick={() => handleSocialSignIn(new FacebookAuthProvider())}
            style={{
              cursor: "pointer",
              marginLeft: "1.5rem",
              marginRight: "1.5rem",
            }}
          />
          <img
            src={github}
            alt="github"
            onClick={() => handleSocialSignIn(new GithubAuthProvider())}
            style={{ cursor: "pointer" }}
          />
        </SocialLogin>
        <p
          style={{
            color: "#828282",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
            fontSize: "0.9rem",
          }}
        >
          Don't have an account?
          <Link to="/register" style={{ color: "#2F80ED" }}>
            Register
          </Link>
        </p>
      </SignIn>
    </>
  );
};

export default Login;
