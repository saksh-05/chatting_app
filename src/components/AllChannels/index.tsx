import React, { useEffect, useState } from "react";
import { Container, ChannelName, Initials } from "./styled";
import {
  getDocs,
  collection,
  getFirestore,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useAppDispatch } from "redux/store";
import { updateChannels } from "redux/actions";
import { Navigate, useNavigate } from "react-router-dom";
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
    };
    //   dispatch(
    //     updateChannels({
    //       channels,
    //     })
    //   );

    getAllChannels();
  }, []);
  return (
    <Container>
      {showLoadingScreen ? <LoadingScreen /> : <></>}
      {console.log(channels)}
      {channels.map((doc) => {
        if (doc.id) {
          const intArr = doc.channelData.name.split(" ");
          var element = "";
          for (let i = 0; i < Math.min(intArr.length, 2); i++) {
            element += intArr[i][0];
          }
          console.log(intArr);
          return (
            <ChannelName
              key={doc.id}
              onClick={async () => {
                // return <Navigate to="/channelDetail" />;
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
        return <></>;
      })}
    </Container>
  );
};

export default AllChannels;
