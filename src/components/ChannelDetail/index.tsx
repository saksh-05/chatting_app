import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Chats,
  Messages,
  MobileNavbar,
  DeskBar,
  HamburgerMenu,
  DeskView,
  MobileView,
  DateLine,
  MessageName,
} from "./styled";
import { updateChannels } from "redux/actions";
import { useAppDispatch } from "redux/store";
import hamburger from "../../resources/hamburger.svg";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import UserMessages from "components/Messages";
import ChannelMenu from "components/ChannelMenu";
import LoadingScreen from "components/LoadingScreen";

const ChannelDetail = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [showView, setShowView] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

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
  const val = location.state as any;

  useEffect(() => {
    const getChats = async () => {
      const db = getFirestore();
      setShowLoadingScreen(true);
      await onSnapshot(
        query(
          collection(db, "channels", val.id, "usersChat"),
          orderBy("createdAt")
        ),
        (onSnap) => {
          onSnap.docChanges().forEach((change) => {
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
      setShowLoadingScreen(false);
    };

    getChats();
  }, [val.id]);
  return (
    <>
      {showLoadingScreen ? (
        <LoadingScreen />
      ) : showView ? (
        <MobileView>
          <ChannelMenu uniqueUsers={uniqueUsers} val={val} />
          <div
            style={{
              zIndex: "1",
              width: "10%",
              fontSize: "1.7rem",
              color: "white",
              position: "fixed",
              left: "auto",
              right: "12px",
              top: "10px",
              background: "#120F13",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "100",
            }}
            onClick={() => setShowView(!showView)}
          >
            X
          </div>
        </MobileView>
      ) : (
        <>
          <DeskView>
            <ChannelMenu uniqueUsers={uniqueUsers} val={val} />
          </DeskView>

          <Chats>
            <MobileNavbar>
              <HamburgerMenu>
                <img
                  src={hamburger}
                  alt="menu"
                  onClick={() => setShowView(!showView)}
                />
              </HamburgerMenu>
              <DeskBar>{val.channelData.name}</DeskBar>
            </MobileNavbar>

            {uniqueDates.map((date) => {
              if (date !== "Invalid Date") {
                return (
                  <>
                    <DateLine>
                      <hr
                        style={{
                          border: "none",
                          background: "#828282",
                          height: "1px",
                        }}
                      />
                      <div>{date}</div>
                    </DateLine>
                    {chats.map((cht) => {
                      if (
                        cht.id &&
                        new Date(cht.chatData.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        ) === date
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
                              <MessageName>
                                {cht.chatData.name}
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {str}
                                </div>
                              </MessageName>
                              {cht.chatData.chat}
                            </div>
                          </Messages>
                        );
                      }
                      return "";
                    })}
                  </>
                );
              }
              return "";
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
      )}
    </>
  );
};

export default ChannelDetail;
