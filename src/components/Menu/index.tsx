import React, { useState } from "react";
import { auth } from "config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import arrow from "../../resources/arrow.svg";
import account from "../../resources/account.svg";
import signout from "../../resources/signout.svg";
import chat from "../../resources/chat.svg";
import profile from "../../resources/profile.svg";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateUser } from "redux/actions";
import { Channels, Add, Dropdown, Profile } from "./styled";
import AllChannels from "components/AllChannels";

const DateLine = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddChannelScreen, setShowAddChannelScreen] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });

  return (
    <Channels>
      <Add>
        <h3>Channels</h3>
        <div
          style={{
            background: "#252329",
            borderRadius: "0.5rem",
            width: "2rem",
            height: "2rem",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "0.1rem",
            cursor: "pointer",
          }}
          onClick={() => setShowAddChannelScreen(true)}
        >
          +
        </div>
      </Add>
      <AllChannels />
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
            <li>
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
      <Profile>
        <div style={{ alignItems: "center", display: "flex" }}>
          <img
            src={
              userData.imageUrl
                ? userData.imageUrl
                : auth.currentUser?.photoURL == null
                ? profile
                : auth.currentUser?.photoURL
            }
            alt="profile"
            style={{
              height: "48px",
              width: "48px",
              borderRadius: "0.5rem",
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
      </Profile>
    </Channels>
  );
};

export default DateLine;
