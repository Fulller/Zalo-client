import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

export default createSlice({
  name: "setting",
  initialState: LocalStorare.get("setting", {
    language: "vi",
    module: {
      isShow: false,
      type: "",
      data: {},
    },
    detailcontent: {
      type: "",
      data: {},
    },
  }),
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
    detailcontent: (state, action) => {
      state.detailcontent = action.payload.detailcontent;
      LocalStorare.set("setting", state);
      return state;
    },
  },
});
