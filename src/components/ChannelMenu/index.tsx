import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "config/firebase-config";
import {
  Channel,
  ChName,
  ChDesc,
  UniqueUsers,
  Dropdown,
  Profile,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateUser } from "redux/actions";
import leftArrow from "../../resources/left-arrow.svg";
import account from "../../resources/account.svg";
import chat from "../../resources/chat.svg";
import signout from "../../resources/signout.svg";
import profile from "../../resources/profile.svg";
import arrow from "../../resources/arrow.svg";
import { useAppDispatch } from "redux/store";

const ChannelMenu = (props: any) => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const { uniqueUsers, val } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);

  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });

  console.log(props);
  return (
    <Channel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "2rem 1.3rem",
          fontSize: "1.2rem",
          fontWeight: "600",
          fontFamily: "Noto Sans Display",
          paddingTop: "1rem",
        }}
      >
        <img
          src={leftArrow}
          alt="back arrow"
          height={32}
          style={{ marginRight: "1rem", cursor: "pointer" }}
          onClick={() =>
            history("/allchannels", {
              state: val.channelData.name,
            })
          }
        />
        All Channels
      </div>
      <div style={{ padding: "0 2rem" }}>
        <ChName>{val.channelData.name}</ChName>
        <ChDesc>{val.channelData.description}</ChDesc>
      </div>
      <UniqueUsers>
        Members
        {uniqueUsers.map((user: typeof uniqueUsers) => {
          if (user.id) {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "400",
                  marginTop: "1rem",
                }}
              >
                <img
                  style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: "0.5rem",
                    marginRight: "0.8rem",
                  }}
                  src={user.chatData.imageUrl}
                  alt="user profile"
                />
                {user.chatData.name}
              </div>
            );
          }
          return "";
        })}
      </UniqueUsers>
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
            <li
              onClick={() =>
                history("/allchannels", {
                  state: val.channelData.name,
                })
              }
            >
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
    </Channel>
  );
};

export default ChannelMenu;
