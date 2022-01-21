import React, { useState, useEffect } from "react";
import { auth } from "config/firebase-config";
import { signOut } from "firebase/auth";
// import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { Channels, Chats, Profile, Dropdown, Add, Messages } from "./styled";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { updateUser } from "redux/actions";
import { RootState } from "redux/reducers";
import arrow from "../../resources/arrow.svg";
import account from "../../resources/account.svg";
import signout from "../../resources/signout.svg";
import chat from "../../resources/chat.svg";
import profile from "../../resources/profile.svg";
import LoadingScreen from "components/LoadingScreen";
import AddChannel from "components/AddChannel";
import AllChannels from "components/AllChannels";

const Main = () => {
  const dispatch = useAppDispatch();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  const history = useNavigate();
  const location = useLocation();
  const val = location.state as any;
  console.log(location);
  console.log(val);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showAddChannelScreen, setShowAddChannelScreen] = useState(false);
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
      // console.log(userId);
      try {
        const userSnap = await getDoc(doc(db, "users", `${userId}`));
        console.log(userSnap);
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
        // userSnap.forEach((doc) => {
        //   console.log(doc.id);
        //   if (doc.id === userId) {
        //     setUserData({
        //       imageUrl: doc.data().photo,
        //       name: doc.data().name,
        //       bio: doc.data().bio,
        //       phone: doc.data().phone,
        //     });
        //     dispatch(
        //       updateUser({
        //         imageUrl: doc.data().photo,
        //         name: doc.data().name,
        //         bio: doc.data().bio,
        //         phone: doc.data().phone,
        //       })
        //     );
        //   }
        //   console.log(updatedUser);
        // });
        setShowLoading(false);

        // console.log(userSnap);
      } catch (err) {
        console.log(err);
      }
      // await onValue(ref(db, "users/" + userId), (snap) => {
      //   console.log(snap.val());
      //   const val = snap.val();
      //   if (val != null) {
      //     setUserData({
      //       imageUrl: val.photo,
      //       name: val.name,
      //       bio: val.bio,
      //       phone: val.phone,
      //     });
      //     dispatch(
      //       updateUser({
      //         imageUrl: val.photo,
      //         name: val.name,
      //         bio: val.bio,
      //         phone: val.phone,
      //       })
      //     );
      //     console.log(updatedUser);
      //   }
      //   setShowLoading(false);
      // });
    };
    // const getAllChannels = async () => {
    //   const db = getDatabase();
    //   const channelsRef = doc(db, "channels");
    // };
    getUserData();
    // getAllChannels();
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
            onClick={() => setShowAddChannelScreen(false)}
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
              handleAddChannel={() => setShowAddChannelScreen(false)}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {showLoading ? (
        <LoadingScreen />
      ) : (
        <>
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
              {val}
            </div>
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
            ></div>
          </Chats>
        </>
      )}
    </div>
  );
};

export default Main;
