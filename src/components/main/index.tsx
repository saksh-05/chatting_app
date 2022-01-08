import React, { useState } from "react";
import { auth } from "config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Channels, Chats, Profile, Dropdown } from "./styled";
import arrow from "../../resources/arrow.svg";
import account from "../../resources/account.svg";
import signout from "../../resources/signout.svg";
import chat from "../../resources/chat.svg";

const Main = () => {
  const history = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const inName =
    auth.currentUser?.displayName != null ? auth.currentUser.displayName : "A";
  return (
    <div>
      <Channels>
        <h1>Channels</h1>
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
                auth.currentUser?.photoURL == null
                  ? inName[0]
                  : auth.currentUser?.photoURL
              }
              alt="profile"
              style={{ height: "48px", width: "48px", borderRadius: "0.5rem" }}
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
      <Chats>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
        <div>section a</div>
      </Chats>
    </div>
  );
};

export default Main;
