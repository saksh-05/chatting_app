import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Register, Btn, SocialLogin, ErrorMessage, Snackbar } from "./styled";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  AuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../config/firebase-config";
import { socialAuthentication } from "../../config/socialAuthentication";
import {
  userEmailSchema,
  userPasswordSchema,
  userNameSchema,
} from "../../config/validation";
import logo from "../../resources/devchallenges-light.svg";
import email from "../../resources/email.svg";
import lock from "../../resources/lock.svg";
import person from "../../resources/person.svg";
import facebook from "../../resources/Facebook.svg";
import google from "../../resources/Google.svg";
import github from "../../resources/Github.svg";

const Signup = () => {
  const [register, setRegister] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    confirmError: "",
  });
  const [snackbar, setSnackbar] = useState("");

  const handleSocialSignIn = async (provider: AuthProvider) => {
    const res = await socialAuthentication(provider);
    console.log(res);
  };

  const validateForm = async () => {
    let emailValid = await userEmailSchema.isValid(register);
    let nameValid = await userNameSchema.isValid(register);
    let passwordValid = await userPasswordSchema.isValid(register);
    if (
      emailValid &&
      nameValid &&
      passwordValid &&
      register.password === register.confirmPassword
    ) {
      setError({
        emailError: "",
        nameError: "",
        passwordError: "",
        confirmError: "",
      });
      setRegister({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      return true;
    } else {
      if (!emailValid) {
        error.emailError = "Invalid Email";
      } else error.emailError = "";
      if (!nameValid) {
        error.nameError = "Min 2 character and max 25 characters";
      } else error.nameError = "";
      if (!passwordValid) {
        error.passwordError = "Length is less than 6";
      } else error.passwordError = "";
      if (register.password !== register.confirmPassword) {
        error.confirmError = "Password does not match";
      } else error.confirmError = "";
      setError({ ...error });

      console.log(error);

      return false;
    }
  };
  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          register.email,
          register.password
        );
        console.log(user);
      } catch (err) {
        const error = err instanceof FirebaseError;
        if (error) {
          setSnackbar(err.code.split("/")[1]);
          console.log("error", err.code);
          console.log(snackbar);
        }
      }
    }
  };
  return (
    <div>
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
      <Register>
        <div>
          <img src={logo} alt="logo" />
          <h3>Join thousands of learners from around the world </h3>
          <p>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="email"
            placeholder="Enter your email"
            value={register.email}
            name="email"
            onChange={(e) => {
              setRegister({ ...register, email: e.target.value });
            }}
            style={{
              background: `url(${email}) no-repeat 5px 12px`,
            }}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Email address"
          />
          {error.emailError ? (
            <ErrorMessage>{error.emailError}</ErrorMessage>
          ) : (
            ""
          )}
          <input
            type="text"
            placeholder="Enter your name"
            name="userName"
            value={register.userName}
            required
            onChange={(e) => {
              setRegister({ ...register, userName: e.target.value });
            }}
            style={{
              background: `url(${person}) no-repeat 5px 12px`,
            }}
          />
          <ErrorMessage>{error.nameError}</ErrorMessage>

          <input
            type="password"
            autoComplete="true"
            placeholder="Enter your password"
            name="password"
            value={register.password}
            required
            onChange={(e) => {
              setRegister({ ...register, password: e.target.value });
            }}
            style={{
              background: `url(${lock}) no-repeat 5px 12px`,
            }}
          />
          <ErrorMessage>{error.passwordError}</ErrorMessage>

          <input
            type="password"
            autoComplete="true"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={register.confirmPassword}
            required
            onChange={(e) => {
              setRegister({ ...register, confirmPassword: e.target.value });
            }}
            style={{
              background: `url(${lock}) no-repeat 5px 12px`,
            }}
          />
          <ErrorMessage>{error.confirmError}</ErrorMessage>

          <Btn type="submit">Register</Btn>
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
          Already have an account?
          <Link to="/" style={{ color: "#2F80ED" }}>
            Login
          </Link>
        </p>
      </Register>
    </div>
  );
};

export default Signup;
