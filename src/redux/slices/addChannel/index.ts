import { createSlice } from "@reduxjs/toolkit";

interface addChannel {
  showAddChannelScreen: boolean;
}

const initialState: addChannel = {
  showAddChannelScreen: false,
};

const updateAddChannelSlice = createSlice({
  name: "update add channel",
  initialState,
  reducers: {
    showChannel: (state, action) => {
      state.showAddChannelScreen = action.payload.show;
    },
  },
});

export const { showChannel } = updateAddChannelSlice.actions;

export default updateAddChannelSlice.reducer;
