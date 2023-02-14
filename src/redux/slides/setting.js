import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

export default createSlice({
  name: "setting",
  initialState: {
    language: "vi",
    module: {
      isShow: false,
      type: "",
      data: {},
    },
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.language;
      LocalStorare.set("setting", state);
      return state;
    },
    setModule: (state, action) => {
      state.module = {
        isShow: action.payload?.isShow || false,
        type: action.payload?.type || "",
        data: action.payload?.data || {},
      };
      LocalStorare.set("setting", state);
      return state;
    },
  },
});
