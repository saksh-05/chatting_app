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
} from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateUser } from "redux/actions";
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
      },
    },
  ]);
  const val = location.state as any;
  console.log(location);

  function idExists(id: string) {
    const idexists = chats.find((chat) => chat.id === id);
    console.log(idexists);
    return idexists;
  }

  useEffect(() => {
    const getChats = async () => {
      const db = getFirestore();
      await onSnapshot(
        query(
          collection(db, "channels", val.id, "usersChat"),
          orderBy("createdAt")
        ),
        (onSnap) => {
          onSnap.forEach((doc) => {
            console.log(chats);
            console.log(doc.id);
            if (doc.id && !idExists(doc.id)) {
              console.log(doc.id);
              chats.push({
                id: doc.id,
                chatData: {
                  chat: doc.data().chat,
                  createdAt: new Date(
                    doc.data().createdAt.seconds * 1000
                  ).toISOString(),
                  imageUrl: doc.data().imageUrl,
                  uId: doc.data().id,
                },
              });
              // setChats({
              //   chats: [
              //     ...chats,
              //     {
              //       id: doc.id,
              //       chatData: {
              //         chat: doc.data().chat,
              //         createdAt: new Date(
              //           doc.data().createdAt.seconds * 1000
              //         ).toISOString(),
              //         imageUrl: doc.data().imageUrl,
              //         uId: doc.data().id,
              //       },
              //     },
              //   ],
              //   //   [
              //   //   ...cht,
              //   //   {
              //   //     id: doc.id,
              //   //     chatData: {
              //   //       chat: doc.data().chat,
              //   //       createdAt: new Date(
              //   //         doc.data().createdAt.seconds * 1000
              //   //       ).toISOString(),
              //   //       imageUrl: doc.data().imageUrl,
              //   //       uId: doc.data().id,
              //   //     },
              //   //   },
              //   // ]
              // });
            }
          });
        }
      );
      // chatCollectionSnap.forEach((doc) => {
      //   console.log(doc.data());
      //   setChats((cht) => [
      //     ...cht,
      //     {
      //       id: doc.id,
      //       chatData: {
      //         chat: doc.data().chat,
      //         createdAt: new Date(
      //           doc.data().createdAt.seconds * 1000
      //         ).toISOString(),
      //         imageUrl: doc.data().imageUrl,
      //         uId: doc.data().id,
      //       },
      //     },
      //   ]);
      // });
    };

    getChats();
  }, [chats.length]);
  return (
    <>
      <Channel>
        {/* {console.log(chats)} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "2rem 1.3rem",
            fontSize: "1.2rem",
            fontWeight: "600",
            fontFamily: "Noto Sans",
            paddingTop: "1rem",
          }}
        >
          <img
            src={leftArrow}
            alt="back arrow"
            height={32}
            style={{ marginRight: "1rem" }}
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
          }}
        >
          {val.channelData.name}
          <hr
            style={{
              border: "1px solid #828282",
              borderRadius: "0.5rem",
              width: "92%",
              marginLeft: "0",
              background: "#828282",
            }}
          />
        </div>

        {chats.map((cht) => {
          console.log(cht);
          if (cht.id) {
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
            const msgDate = new Date(cht.chatData.createdAt).toLocaleString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            );
            const msgTime = new Date(cht.chatData.createdAt).toLocaleString(
              "en-US",
              { hour: "numeric", minute: "numeric" }
            );
            var str = "";
            if (todayString === msgDate) {
              str = "Today at " + msgTime;
            } else if (yesterday === msgDate) {
              str = "YesterDay at " + msgTime;
            } else {
              str =
                new Date(cht.chatData.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                }) +
                " at " +
                msgTime;
            }

            return (
              <Messages key={cht.id}>
                {new Date(cht.chatData.createdAt) === new Date() ? (
                  <DateLine />
                ) : (
                  ""
                )}
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
                    fontWeight: "100",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      fontFamily: "Noto Sans",
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
