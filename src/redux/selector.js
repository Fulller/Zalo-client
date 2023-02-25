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
    resquestfriends: function (state) {
      return state.datauser.requestfriends;
    },
    wanttobefriends: function (state) {
      return state.datauser.wanttobefriends;
    },
  },
};
