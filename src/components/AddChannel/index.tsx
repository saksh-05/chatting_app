import React, { useState } from "react";
import { Container, Button } from "./styled";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import LoadingScreen from "components/LoadingScreen";

const AddChannel = ({ handleAddChannel }: any) => {
  const [channel, setChannel] = useState({
    name: "",
    description: "",
    createdAt: new Date(),
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const handleSubmit = async () => {
    const db = getFirestore();
    setShowLoadingScreen(true);
    await addDoc(collection(db, "channels"), channel)
      .then(() => {
        console.log("Channel Added");
        handleAddChannel(false);
      })
      .catch((error) => console.log(error));
    setShowLoadingScreen(false);
  };
  return (
    <Container>
      {showLoadingScreen ? <LoadingScreen /> : ""}
      <h3>New Channel</h3>
      <input
        required
        type="text"
        placeholder="Channel Name"
        value={channel.name}
        onChange={(e) => setChannel({ ...channel, name: e.target.value })}
        style={{
          height: "2rem",
        }}
      />
      <textarea
        rows={5}
        required
        placeholder="Channel description"
        value={channel.description}
        onChange={(e) =>
          setChannel({ ...channel, description: e.target.value })
        }
        style={{ paddingTop: "0.5rem" }}
      ></textarea>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </div>
    </Container>
  );
};

export default AddChannel;
