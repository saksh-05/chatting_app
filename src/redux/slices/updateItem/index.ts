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
      name: string;
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
        name: "",
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
      state.name = acp.name;
      state.bio = acp.bio;
      state.phone = acp.phone;
      state.photo = acp.imageUrl;
    },
    updateChannels: (state, action) => {
      const acp = action.payload;
      if (acp.id) {
        if (acp.channelId === state.channelId) {
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
                  name: acp.chatData.name,
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
                  name: acp.chatData.name,
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
