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
  },
});
