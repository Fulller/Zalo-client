import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

export default createSlice({
  name: "user",
  initialState: LocalStorare.get("user", null),
  reducers: {
    setUser: (state, action) => {
      state = action.payload.user;
      LocalStorare.set("user", state);
      return state;
    },
    setDefault: (state, action) => {
      state = null;
      LocalStorare.set("user", state);
      return state;
    },
    updateUser: (state, action) => {
      state.avatar = action.payload.avatar;
      state.showName = action.payload.showName;
      state.background = action.payload.background;
      LocalStorare.set("user", state);
      return state;
    },
    setRandomBackground: (state, action) => {
      LocalStorare.set("user", state);
      state.backgound = action.payload;
      return state;
    },
  },
});
