import React, { useState, useEffect } from "react";
import { auth } from "config/firebase-config";
import { signOut } from "firebase/auth";
// import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Channels, Chats, Profile, Dropdown, Add } from "./styled";
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

const Main = () => {
  const dispatch = useAppDispatch();
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  const history = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showAddChannelScreen, setShowAddChannelScreen] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: updatedUser.photo,
    name: updatedUser.name,
    bio: updatedUser.bio,
    phone: updatedUser.phone,
  });
  useEffect(() => {
    const getUserData = async () => {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      console.log(userId);
      try {
        const userSnap = await getDocs(collection(db, "users"));
        userSnap.forEach((doc) => {
          setUserData({
            imageUrl: doc.data().photo,
            name: doc.data().name,
            bio: doc.data().bio,
            phone: doc.data().phone,
          });
          dispatch(
            updateUser({
              imageUrl: doc.data().photo,
              name: doc.data().name,
              bio: doc.data().bio,
              phone: doc.data().phone,
            })
          );
          console.log(updatedUser);
        });
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
            <AddChannel />
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
                  paddingBottom: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setShowAddChannelScreen(true)}
              >
                +
              </div>
            </Add>
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
        </>
      )}
    </div>
  );
};

export default Main;
