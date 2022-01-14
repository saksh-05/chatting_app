import React, { useState } from "react";
import { Container, Button } from "./styled";
import { set, ref, getDatabase } from "firebase/database";

const AddChannel = () => {
  const [channel, setChannel] = useState({
    name: "",
    description: "",
  });
  const handleSubmit = async () => {
    const db = getDatabase();
    await set(ref(db, "channels/"), channel)
      .then(() => {
        console.log("Channel Added");
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      <h3>New Channel</h3>
      <input
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
        placeholder="Channel description"
        value={channel.description}
        onChange={(e) =>
          setChannel({ ...channel, description: e.target.value })
        }
        style={{ paddingTop: "0.5rem" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button onClick={() => handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default AddChannel;
