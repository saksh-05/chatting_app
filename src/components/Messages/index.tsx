import React, { useState } from "react";
import { ChatMessage } from "./styled";
import send from "../../resources/send.svg";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "config/firebase-config";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const UserMessages = (props: any) => {
  const updatedUser = useSelector((state: RootState) => state.updateUserItem);
  const { id } = props;
  const [message, setMessage] = useState("");
  const uid = auth.currentUser?.uid;
  const handleSubmit = async () => {
    try {
      const db = getFirestore();
      const messageRef = await addDoc(
        collection(db, "channels", id, "usersChat"),
        {
          chat: message,
          createdAt: new Date(),
          uId: uid,
          imageUrl: `${
            updatedUser.photo ? updatedUser.photo : auth.currentUser?.photoURL
          }`,
          name: `${
            updatedUser.name ? updatedUser.name : auth.currentUser?.displayName
          }`,
        }
      );
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ChatMessage>
      <textarea
        name="message"
        rows={3}
        cols={100}
        wrap="soft"
        maxLength={180}
        style={{ overflow: "hidden", resize: "none" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div>
        <img src={send} alt="send message" onClick={handleSubmit} />
      </div>
    </ChatMessage>
  );
};

export default UserMessages;
