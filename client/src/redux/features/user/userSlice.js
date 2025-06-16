import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const getUser = (state) => state.user.user;
export const { setCredentials, removeUser } = userSlice.actions;
export default userSlice.reducer;
