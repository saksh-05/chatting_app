import React, { useState } from "react";
import { Container, Back, Dropdown, Navbar } from "./styled";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "config/firebase-config";
import devChallenge from "../../resources/devchallenges-light.svg";
import arrow from "../../resources/arrow.svg";
import backarrow from "../../resources/back-arrow.svg";
import account from "../../resources/account.svg";
import signout from "../../resources/signout.svg";
import chat from "../../resources/chat.svg";
import camera from "../../resources/camera.svg";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EditUser = () => {
  const history = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const UserSchema = Yup.object().shape({
    name: Yup.string().max(30, "Too Long"),
    bio: Yup.string().max(50, "Too Long"),
    photo: Yup.string(),
    phone: Yup.number(),
    password: Yup.string().max(15, "Too Long"),
  });
  // const [formValue,setFormValue]=useState({
  //   name:{auth.currentUser?.displayName},
  // })

  return (
    <div style={{ color: "#fff" }}>
      {showDropdown ? (
        <Dropdown>
          <ul>
            <li onClick={() => history("/profile")}>
              <img
                src={account}
                alt="profile"
                style={{ marginRight: "1rem" }}
              />
              Profile
            </li>
            <li onClick={() => history("/allchannels")}>
              <img
                src={chat}
                alt="group chat"
                style={{ marginRight: "1rem" }}
              />
              Channels
            </li>
            <hr></hr>
            <li
              style={{ color: "#EB5757" }}
              onClick={async () => {
                await signOut(auth);
                history("/");
              }}
            >
              <img
                src={signout}
                alt="exit to app"
                style={{ marginRight: "1rem" }}
              />
              SignOut
            </li>
          </ul>
        </Dropdown>
      ) : (
        <></>
      )}
      <Navbar>
        <div>
          <img src={devChallenge} alt="logo" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ alignItems: "center", display: "flex" }}>
            <img
              src={
                auth.currentUser?.photoURL == null
                  ? "DEV"
                  : auth.currentUser?.photoURL
              }
              alt="profile"
              style={{
                height: "48px",
                width: "48px",
                borderRadius: "0.5rem",
                marginRight: "0.5rem",
              }}
            />
          </div>
          {auth.currentUser?.displayName}
          <div
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </Navbar>
      <Back>
        <img src={backarrow} alt="back arrow" />
        <h5>Back</h5>
      </Back>
      <Container>
        <div>
          <h2 style={{ margin: "0" }}>Change Info</h2>
          <h5 style={{ marginTop: "0.5rem", fontWeight: "400" }}>
            Changes will be reflected to every services
          </h5>
        </div>

        <Formik
          initialValues={{
            photo: `${auth.currentUser?.photoURL}`,
            name: `${auth.currentUser?.displayName}`,
            bio: "bio",
            phone: `${auth.currentUser?.phoneNumber}`,
            password: "",
            confirmPassword: "",
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, action) => {
            console.log(values);
            console.log(values.photo);
            await axios
              .put(
                "https://auth-app-2abcb-default-rtdb.firebaseio.com/",
                {
                  values,
                },
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                      "POST, GET, OPTIONS, DELETE, PUT",
                  },
                }
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            // dispatch(addItem());
            action.setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div
                style={{
                  height: "7rem",
                  display: "flex",
                  alignItems: "center",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    zIndex: "-1",
                    opacity: "0.5",
                  }}
                >
                  <img
                    src={values.photo}
                    alt="back"
                    style={{
                      height: "80px",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  <img src={camera} alt="camera" />
                </label>
                <input
                  name="photo"
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      setFieldValue("photo", fileReader.result);
                      console.log(values.photo);
                    };
                    if (e.target.files) {
                      fileReader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Name</label>
                <Field name="name" as="textarea" placeholder="Enter a name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Email</label>
                <Field
                  name="email"
                  as="textarea"
                  placeholder={auth.currentUser?.email}
                  value={auth.currentUser?.email}
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Bio</label>
                <Field
                  name="bio"
                  as="textarea"
                  placeholder="Enter some bios"
                  style={{ height: "4rem", resize: "none" }}
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Phone</label>
                <Field
                  name="phone"
                  type="number"
                  placeholder={
                    auth.currentUser?.phoneNumber == null ||
                    auth.currentUser?.phoneNumber === undefined
                      ? 0
                      : auth.currentUser?.phoneNumber
                  }
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Leave it blank for current password"
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Leave it blank for current password"
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <input
                type="submit"
                style={{
                  borderRadius: "0.5rem",
                  background: "dodgerblue",
                  height: "2.5rem",
                  width: "5rem",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default EditUser;
