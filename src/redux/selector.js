export default {
  language: (state) => {
    return state.setting.language;
  },
  user: (state) => {
    return state.user;
  },
  module: (state) => {
    return state.setting.module;
  },
  detailcontent: (state) => {
    return state.setting.detailcontent;
  },
  showinfocontent: (state) => {
    return state.setting.showinfocontent;
  },
  datauser: {
    groups: function (state) {
      return state.datauser.groups;
    },
    friends: function (state) {
      return state.datauser.friends;
    },
    friendsMap: function (state) {
      return state.datauser.friendsMap;
    },
    resquestfriends: function (state) {
      return state.datauser.requestfriends;
    },
    wanttobefriends: function (state) {
      return state.datauser.wanttobefriends;
    },
    conversations: function (state) {
      return state.datauser.conversations;
    },
    messageshistory: function (state) {
      return state.datauser.messageshistory;
    },
  },
  searchnavlist: (state) => {
    return state.setting.searchnavlist;
  },
  viewphotos: (state) => {
    return state.setting.viewphotos;
  },
  isshownavlist: (state) => {
    return state.setting.isshownavlist;
  },
  notification: (state) => {
    return state.setting.notification;
  },
  searchnavlist: (state) => {
    return state.setting.searchnavlist;
  },
};
