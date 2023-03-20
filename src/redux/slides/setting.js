import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

let initialState = {
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
  showinfocontent: false,
  searchnavlist: {
    isShow: false,
    data: "",
  },
  viewphotos: {
    title: "",
    index: 0,
    photos: [],
  },
  isshownavlist: true,
};
export default createSlice({
  name: "setting",
  initialState: LocalStorare.get("setting", initialState),
  reducers: {
    setDefault: (state, action) => {
      state = initialState;
      return state;
    },
    setLanguage: (state, action) => {
      state.language = action.payload.language;
      LocalStorare.set("setting", state);
      return state;
    },
    setModule: (state, action) => {
      state.module = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    detailcontent: (state, action) => {
      state.detailcontent = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    toggleShowinfocontent: (state, action) => {
      state.showinfocontent = !state.showinfocontent;
      LocalStorare.set("setting", state);
      return state;
    },
    setshowinfocontent: (state, action) => {
      state.showinfocontent = state.action;
      LocalStorare.set("setting", state);
      return state;
    },
    setSearchnavlist: (state, action) => {
      state.searchnavlist = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    setViewphotos: (state, action) => {
      state.viewphotos = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
    setIsshownavlist: (state, action) => {
      state.isshownavlist = action.payload;
      LocalStorare.set("setting", state);
      return state;
    },
  },
});
