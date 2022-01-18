import { bindActionCreators, createSlice } from "@reduxjs/toolkit";

interface UpdateUserItem {
  name: string;
  bio: string;
  phone: number;
  photo: string;
}

const initialState: UpdateUserItem = {
  name: "",
  bio: "",
  phone: 0,
  photo: "",
};

const updateUserSlice = createSlice({
  name: "update user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.phone = action.payload.phone;
      state.photo = action.payload.imageUrl;
    },
    updateChannels:(state,action)=>{
      console.log(action.payload);
    }
  },
});

export const { updateUser,updateChannels } = updateUserSlice.actions;

export default updateUserSlice.reducer;
