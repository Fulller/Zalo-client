import { createSlice } from "@reduxjs/toolkit";
import LocalStorare from "../../tools/localStorage";

let initialState = {
  friends: [],
  friendsMap: {},
  groups: [],
  requestfriends: [],
  wanttobefriends: [],
  conversations: {},
  messageshistory: [],
  avatarMap: {},
};
export default createSlice({
  name: "datauser",
  initialState: initialState,
  reducers: {
    setDefault: (state, action) => {
      state = initialState;
      return state;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
      return state;
    },
    setFriendsMap: (state, action) => {
      state.friendsMap = action.payload;
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
      state.friendsMap[action.payload.userName] = action.payload;
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
    setConversations: (state, action) => {
      state.conversations = action.payload;
      return state;
    },
    setMessages: (state, action) => {
      state.conversations[action.payload.conversationId].messages =
        action.payload.messages;
      return state;
    },
    setMessagesHistory: (state, action) => {
      state.messageshistory = action.payload;
      return state;
    },
    updateMessagesHistory: (state, action) => {
      state.messageshistory = state.messageshistory.filter((mh) => {
        return mh != action.payload;
      });
      state.messageshistory.unshift(action.payload);
      return state;
    },
    setAvatarMap: (state, action) => {
      state.avatarMap = action.payload;
      return state;
    },
    setFriendToFriendMap: (state, action) => {
      state.friendsMap[action.payload.userName] = action.payload;
      for (let indexFriend in state.friends) {
        if (state.friends[indexFriend].userName == action.payload.userName) {
          state.friends[indexFriend] = action.payload;
        }
      }
      return state;
    },
    deleteonmyside: (state, action) => {
      for (let index in state.conversations[
        action.payload.message.conversationId
      ].messages) {
        if (
          state.conversations[action.payload.message.conversationId].messages[
            index
          ]._id == action.payload.message._id
        ) {
          state.conversations[action.payload.message.conversationId].messages[
            index
          ] = action.payload.message;
        }
      }
      return state;
    },
  },
});
