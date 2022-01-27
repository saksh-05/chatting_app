import React, { useEffect, useState } from "react";
import { Container, ChannelName, Initials } from "./styled";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";

const AllChannels = () => {
  const history = useNavigate();
  const [channels, setChannels] = useState([
    {
      id: "",
      channelData: {
        name: "",
        description: "",
      },
    },
  ]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    const getAllChannels = async () => {
      const db = getFirestore();
      setShowLoadingScreen(true);
      await onSnapshot(
        query(collection(db, "channels"), orderBy("createdAt")),
        (onSnap) => {
          onSnap.docChanges().forEach((change) => {
            if (change.type === "added") {
              setChannels((cht) => [
                ...cht,
                {
                  id: change.doc.id,
                  channelData: {
                    name: change.doc.data().name,
                    description: change.doc.data().description,
                  },
                },
              ]);
            }
          });
        }
      );
      setShowLoadingScreen(false);
    };
    getAllChannels();
  }, []);
  return (
    <Container>
      {showLoadingScreen ? <LoadingScreen /> : <></>}
      {channels.map((doc) => {
        if (doc.id) {
          const intArr = doc.channelData.name.split(" ");
          var element = "";
          for (let i = 0; i < Math.min(intArr.length, 2); i++) {
            element += intArr[i][0];
          }
          return (
            <ChannelName
              key={doc.id}
              onClick={async () => {
                await history("/channelDetail", {
                  state: doc,
                });
              }}
            >
              <Initials>{element}</Initials>
              {doc.channelData.name}
            </ChannelName>
          );
        }
        return "";
      })}
    </Container>
  );
};

export default AllChannels;
