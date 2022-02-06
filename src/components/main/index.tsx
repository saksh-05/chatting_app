import React, { useState, useEffect } from "react";
import { auth } from "config/firebase-config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import {
  Chats,
  Messages,
  MobileView,
  HamburgerMenu,
  DeskView,
  MobileNavbar,
  DeskBar,
  DateLine,
} from "./styled";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { updateUser, showChannel } from "redux/actions";
import { RootState } from "redux/reducers";
import LoadingScreen from "components/LoadingScreen";
import AddChannel from "components/AddChannel";
import Menu from "components/Menu";
import hamburger from "../../resources/hamburger.svg";

const Main = () => {
  const dispatch = useAppDispatch();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  const showAddChannelScreen = useSelector(
    (state: RootState) => state.addChannel.showAddChannelScreen
  );
  const location = useLocation();
  const val = location.state as any;
  console.log(location);
  console.log(val);

  const [showLoading, setShowLoading] = useState(true);
  const [showView, setShowView] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });

  const allDates = updatedUser.chats.map((cht) =>
    new Date(cht.chatData.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
  const uniqueDates = [...Array.from(new Set(allDates))];

  useEffect(() => {
    const getUserData = async () => {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      try {
        const userSnap = await getDoc(doc(db, "users", `${userId}`));
        if (userSnap.exists()) {
          setUserData({
            imageUrl: userSnap.data().photo,
            name: userSnap.data().name,
            bio: userSnap.data().bio,
            phone: userSnap.data().phone,
          });
          dispatch(
            updateUser({
              imageUrl: userSnap.data().photo,
              name: userSnap.data().name,
              bio: userSnap.data().bio,
              phone: userSnap.data().phone,
            })
          );
        }

        setShowLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);
  return (
    <div>
      {showAddChannelScreen ? (
        <>
          <div
            style={{
              background: "rgb(18, 15, 19)",
              opacity: "0.5",
              height: "100vh",
              position: "fixed",
              zIndex: "1",
              width: "100%",
            }}
            onClick={() =>
              dispatch(
                showChannel({
                  show: false,
                })
              )
            }
          ></div>
          <div
            style={{
              position: "fixed",
              zIndex: "1",
              right: "23.5rem",
              top: "4rem",
            }}
          >
            <AddChannel
              handleAddChannel={() =>
                dispatch(
                  showChannel({
                    show: false,
                  })
                )
              }
            />
          </div>
        </>
      ) : (
        ""
      )}
      {showLoading ? (
        <LoadingScreen />
      ) : showView ? (
        <MobileView>
          <Menu />
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
            <Menu />
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
              <DeskBar>{val}</DeskBar>
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
                    {updatedUser.chats.map((cht) => {
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
              return "";
            })}
            <div
              style={{
                position: "fixed",
                bottom: "10px",
                width: "100%",
              }}
            ></div>
          </Chats>
        </>
      )}
    </div>
  );
};

export default Main;
