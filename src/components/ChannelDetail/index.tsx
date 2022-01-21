import React, { useState, useEffect, useMemo } from "react";
import { signOut } from "firebase/auth";
import { auth } from "config/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Channel,
  Chats,
  Profile,
  Dropdown,
  ChName,
  ChDesc,
  Messages,
  UniqueUsers,
} from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateUser, updateChannels } from "redux/actions";
import { useAppDispatch } from "redux/store";
import leftArrow from "../../resources/left-arrow.svg";
import account from "../../resources/account.svg";
import chat from "../../resources/chat.svg";
import signout from "../../resources/signout.svg";
import profile from "../../resources/profile.svg";
import arrow from "../../resources/arrow.svg";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import UserMessages from "components/Messages";
import DateLine from "components/Dateline";

const ChannelDetail = () => {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  console.log("updatedUser", updatedUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });
  const [chats, setChats] = useState([
    {
      id: "",
      chatData: {
        chat: "",
        createdAt: "",
        imageUrl: "",
        uId: "",
        name: "",
      },
    },
  ]);
  const allDates = chats.map((cht) =>
    new Date(cht.chatData.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
  const uniqueDates = [...Array.from(new Set(allDates))];

  const uniqueUsers = [
    ...Array.from(
      chats
        .reduce((map, obj) => map.set(obj.chatData.uId, obj), new Map())
        .values()
    ),
  ];
  console.log(uniqueUsers);
  const val = location.state as any;
  console.log(location);

  useEffect(() => {
    const getChats = async () => {
      const db = getFirestore();
      await onSnapshot(
        query(
          collection(db, "channels", val.id, "usersChat"),
          orderBy("createdAt")
        ),
        (onSnap) => {
          onSnap.docChanges().forEach((change) => {
            console.log(change.doc.id);
            console.log(change.doc.data().uId);
            if (change.type === "added") {
              setChats((cht) => [
                ...cht,
                {
                  id: change.doc.id,
                  chatData: {
                    chat: change.doc.data().chat,
                    createdAt: new Date(
                      change.doc.data().createdAt.seconds * 1000
                    ).toISOString(),
                    imageUrl: change.doc.data().imageUrl,
                    uId: change.doc.data().uId,
                    name: change.doc.data().name,
                  },
                },
              ]);
              dispatch(
                updateChannels({
                  channelId: val.id,
                  id: change.doc.id,
                  chatData: {
                    chat: change.doc.data().chat,
                    createdAt: new Date(
                      change.doc.data().createdAt.seconds * 1000
                    ).toISOString(),
                    imageUrl: change.doc.data().imageUrl,
                    uId: change.doc.data().uId,
                    name: change.doc.data().name,
                  },
                })
              );
            }
          });
        }
      );
    };

    getChats();
  }, [val.id]);
  return (
    <>
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
          <ChName>
            {location != null && location
              ? val.channelData.name
              : "channel detail"}
          </ChName>
          <ChDesc>{val.channelData.description}</ChDesc>
        </div>
        <UniqueUsers>
          Members
          {uniqueUsers.map((user) => {
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
            return <></>;
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
      <Chats>
        <div
          style={{
            height: "4rem",
            width: "100%",
            position: "relative",
            right: "0",
            left: "-64px",
            top: "-15px",
            boxShadow: "1px 1px 9px -4px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "4rem",
          }}
        >
          {val.channelData.name}
        </div>
        {console.log(chats)}
        {uniqueDates.map((date) => {
          console.log(date);
          if (date !== "Invalid Date") {
            return (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    position: "relative",
                    left: "-4%",
                    marginTop: "2rem",
                  }}
                >
                  <hr
                    style={{
                      border: "none",
                      background: "#828282",
                      height: "1px",
                    }}
                  />
                  <div
                    style={{
                      width: "10%",
                      margin: "auto",
                      background: " #252329",
                      position: "relative",
                      top: "-16px",
                    }}
                  >
                    {date}
                  </div>
                </div>
                {chats.map((cht) => {
                  if (
                    cht.id &&
                    new Date(cht.chatData.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }) === date
                  ) {
                    const today = new Date();
                    const todayString = today.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const yesterday = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate() - 1
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const msgDate = new Date(
                      cht.chatData.createdAt
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const msgTime = new Date(
                      cht.chatData.createdAt
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    });
                    var str = "";
                    if (todayString === msgDate) {
                      str = "Today at " + msgTime;
                    } else if (yesterday === msgDate) {
                      str = "YesterDay at " + msgTime;
                    } else {
                      str =
                        new Date(cht.chatData.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        ) +
                        " at " +
                        msgTime;
                    }

                    return (
                      <Messages key={cht.id}>
                        <div
                          style={{
                            height: "42px",
                            width: "42px",
                            borderRadius: "0.5rem",
                            marginRight: "1rem",
                          }}
                        >
                          <img
                            src={cht.chatData.imageUrl}
                            alt="user profile"
                            height={42}
                            width={42}
                            style={{
                              borderRadius: "0.5rem",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: "400",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                              fontWeight: "700",
                              fontFamily: "Noto Sans Display",
                              color: "#828282",
                              marginBottom: "0.2rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {userData.name
                              ? userData.name
                              : auth.currentUser?.displayName}
                            <div
                              style={{
                                marginLeft: "1rem",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {str}
                            </div>
                          </div>
                          {cht.chatData.chat}
                        </div>
                      </Messages>
                    );
                  }
                  return <></>;
                })}
              </>
            );
          }
          return <></>;
        })}

        <div
          style={{
            position: "fixed",
            bottom: "10px",
            width: "100%",
          }}
        >
          <UserMessages id={val.id} />
        </div>
      </Chats>
    </>
  );
};

export default ChannelDetail;
