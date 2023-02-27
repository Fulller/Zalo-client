import axios from "axios";
import url from "../tools/url";
export default {
  login: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/login"),
      params: {
        userName: body.userName,
        password: body.password,
      },
    }).then((data) => data.data);
  },
  register: function (body) {
    return axios({
      method: "post",
      url: url.server.userAPI("/register"),
      data: {
        userName: body.userName,
        password: body.password,
        showName: body.showName,
        male: body.male,
      },
    }).then((data) => data.data);
  },
  gettypefriends: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/gettypefriends"),
      params: {
        userName: body.userName,
        type: body.type || "friends",
      },
    }).then((data) => data.data);
  },
  addfriend: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/addfriend"),
      data: {
        userName: body.userName,
        userNameFriend: body.userNameFriend,
      },
    }).then((data) => data.data);
  },
  wanttobefriend: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/wanttobefriend"),
      data: {
        userName: body.userName,
        userNameFriend: body.userNameFriend,
      },
    }).then((data) => data.data);
  },
  unfriend: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/unfriend"),
      data: {
        userName: body.userName,
        userNameFriend: body.userNameFriend,
      },
    }).then((data) => data.data);
  },
  sendmessage: function (body) {
    return axios({
      method: "post",
      url: url.server.userAPI("/sendmessage"),
      data: {
        conversationId: body.conversationId,
        content: body.content,
        sender: body.sender,
      },
    }).then((data) => data.data);
  },
  getconversation: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/getconversation"),
      params: {
        conversationId: body.conversationId,
      },
    }).then((data) => data.data);
  },
  findfriend: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/findfriend"),
      params: {
        userNameFriend: body.userNameFriend,
      },
    }).then((data) => data.data);
  },
  updatamessageshistory: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/updatamessageshistory"),
      data: {
        userName: body.userName,
        conversationId: body.conversationId,
      },
    }).then((data) => data.data);
  },
  getoptional: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/getoptional"),
      params: {
        userName: body.userName,
        optional: body.optional,
      },
    }).then((data) => data.data);
  },
};
