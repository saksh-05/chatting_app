import React, { useEffect, useState } from "react";
import { Container, ChannelName } from "./styled";
import { getDocs, collection, getFirestore } from "firebase/firestore";

const AllChannels = () => {
  const [channels, setChannels] = useState([
    {
      id: "",
      channelData: {
        name: "",
        description: "",
      },
    },
  ]);

  useEffect(() => {
    const getAllChannels = async () => {
      const db = getFirestore();
      const channelSnap = await getDocs(collection(db, "channels"));
      console.log(channelSnap);
      channelSnap.forEach((doc) => {
        console.log(doc.id);
        setChannels((chnl) => [
          ...chnl,
          {
            id: doc.id,
            channelData: {
              name: doc.data().name,
              description: doc.data().description,
            },
          },
        ]);
      });
    };

    getAllChannels();
  }, []);
  return (
    <Container>
      {console.log(channels)}
      {channels.map((doc) => {
        return <ChannelName key={doc.id}>{doc.channelData.name}</ChannelName>;
      })}
    </Container>
  );
};

export default AllChannels;
