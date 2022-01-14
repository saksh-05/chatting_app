import React, { useState } from "react";
import { auth } from "config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Navbar, Profile, Userdetail, Dropdown, Specialdiv } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { updateUser } from "redux/actions";
import devChallenge from "../../resources/devchallenges-light.svg";
import arrow from "../../resources/arrow.svg";
import account from "../../resources/account.svg";
import signout from "../../resources/signout.svg";
import chat from "../../resources/chat.svg";

const Account = () => {
  const dispatch = useAppDispatch();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  const history = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(updatedUser);
  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });

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
                setUserData({
                  name: "",
                  bio: "",
                  phone: 0,
                  imageUrl: "",
                });
                dispatch(
                  updateUser({
                    userData,
                  })
                );
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
                userData.imageUrl
                  ? userData.imageUrl
                  : auth.currentUser === undefined ||
                    auth.currentUser?.photoURL == null ||
                    auth.currentUser == null
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
          {userData.name ? userData.name : auth.currentUser?.displayName}
          <div
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </Navbar>
      <Profile>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "0" }}>Personal Info</h2>
          <h4
            style={{
              fontWeight: "500",
              marginTop: "0.5rem",
            }}
          >
            Basic info, like your name and photo
          </h4>
        </div>
        <Userdetail>
          <tr>
            <td
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid white",
                borderTopRightRadius: "0.5rem",
                borderTopLeftRadius: "0.5rem",
              }}
            >
              <div>
                <h2>Profile</h2>
                <h5 style={{ width: "14rem", fontWeight: "300" }}>
                  Some info may be visible to other people
                </h5>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    width: "5rem",
                    height: "3rem",
                    background: "none",
                    border: "1px solid white",
                    color: "white",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => history("/editUser")}
                >
                  Edit
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Photo</h5>
              <Specialdiv>
                <img
                  src={
                    userData.imageUrl
                      ? userData.imageUrl
                      : auth.currentUser?.photoURL == null
                      ? "DEV"
                      : auth.currentUser?.photoURL
                  }
                  alt="user"
                  style={{
                    borderRadius: "0.5rem",
                    height: "100px",
                  }}
                />
              </Specialdiv>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Name</h5>
              <Specialdiv>
                {userData.name ? userData.name : auth.currentUser?.displayName}
              </Specialdiv>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Bio</h5>
              <Specialdiv>{userData.bio ? userData.bio : "null"}</Specialdiv>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Email</h5>
              <Specialdiv>{auth.currentUser?.email}</Specialdiv>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Phone</h5>
              <Specialdiv>
                {userData.phone
                  ? userData.phone
                  : auth.currentUser?.phoneNumber == null
                  ? "not specified"
                  : auth.currentUser?.phoneNumber}
              </Specialdiv>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottomRightRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
              }}
            >
              <h5>Password</h5>
              <Specialdiv>******</Specialdiv>
            </td>
          </tr>
        </Userdetail>
      </Profile>
    </div>
  );
};

export default Account;
