import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "setting",
  initialState: {
    language: "vi",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload.language;
      return state;
    },
  },
});
