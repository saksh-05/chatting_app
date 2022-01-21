import { createSlice } from "@reduxjs/toolkit";

interface UpdateUserItem {
  name: string;
  bio: string;
  phone: number;
  photo: string;
  channelId: string;
  chats: {
    id: string;
    chatData: {
      uId: string;
      imageUrl: string;
      chat: string;
      createdAt: string;
    };
  }[];
}

const initialState: UpdateUserItem = {
  name: "",
  bio: "",
  phone: 0,
  photo: "",
  channelId: "",
  chats: [
    {
      id: "",
      chatData: {
        uId: "",
        imageUrl: "",
        chat: "",
        createdAt: "",
      },
    },
  ],
};
const updateUserSlice = createSlice({
  name: "update user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const acp = action.payload;
      console.log("acp", acp);
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.phone = action.payload.phone;
      state.photo = action.payload.imageUrl;
    },
    updateChannels: (state, action) => {
      console.log("updateChannels", action.payload);
      const acp = action.payload;
      if (action.payload.id) {
        if (action.payload.channelId === state.channelId) {
          return {
            ...state,
            chats: [
              ...state.chats,
              {
                id: acp.id,
                chatData: {
                  uId: acp.chatData.uId,
                  imageUrl: acp.chatData.imageUrl,
                  chat: acp.chatData.chat,
                  createdAt: acp.chatData.createdAt,
                },
              },
            ],
          };
        } else {
          return {
            ...state,
            channelId: acp.channelId,
            chats: [
              {
                id: acp.id,
                chatData: {
                  uId: acp.chatData.uId,
                  imageUrl: acp.chatData.imageUrl,
                  chat: acp.chatData.chat,
                  createdAt: acp.chatData.createdAt,
                },
              },
            ],
          };
        }
      }
    },
  },
});

export const { updateUser, updateChannels } = updateUserSlice.actions;

export default updateUserSlice.reducer;
