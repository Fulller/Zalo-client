import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state = action.payload.user;
      return state;
    },
  },
});
