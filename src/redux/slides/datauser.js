import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

export default createSlice({
  name: "datauser",
  initialState: {
    friends: [],
    groups: [],
    requestfriends: [],
    wanttobefriends: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
      return state;
    },
    setRequestFriends: (state, action) => {
      state.requestfriends = action.payload;
      return state;
    },
    setWanttobeFriends: (state, action) => {
      state.wanttobefriends = action.payload;
      return state;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
      state.requestfriends = state.requestfriends.filter((friend) => {
        return friend.userName != action.payload.userName;
      });
      return state;
    },
    wanttobeFriend: (state, action) => {
      state.wanttobefriends.push(action.payload);
    },
    unfriend: (state, action) => {
      state.friends = state.friends.filter((friend) => {
        return friend.userName != action.payload.userName;
      });
      return state;
    },
  },
});
