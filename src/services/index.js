import axios from "axios";
import url from "../tools/url";
import imageBase64 from "../tools/imageBase64";
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
  getinfouser: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/getinfouser"),
      params: {
        userName: body.userName,
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
        type: body.type || "message",
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
  uploadImage: function (body) {
    let bodyFormData = new FormData();
    bodyFormData.append("image", body);
    return axios({
      method: "post",
      url: url.server.imageAPI("/upload"),
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    }).then((data) => data.data);
  },
  getImage: function (body) {
    return axios({
      method: "get",
      url: url.server.imageAPI("/get"),
      params: {
        id: body,
      },
    }).then((data) => imageBase64(data?.data?.data));
  },
  updatamessageshistory: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/updatamessageshistory"),
      data: body,
    }).then((data) => data.data);
  },
  updateinfouser: function (body) {
    return axios({
      method: "put",
      url: url.server.userAPI("/updateinfouser"),
      data: body,
    }).then((data) => data.data);
  },
  sendmessageV2: function (body) {
    return axios({
      method: "post",
      url: url.server.userAPI("/sendmessageV2"),
      data: {
        conversationId: body.conversationId,
        content: body.content,
        sender: body.sender,
        type: body.type || "message",
      },
    }).then((data) => data.data);
  },
  getmessageV2: function (body) {
    return axios({
      method: "get",
      url: url.server.userAPI("/getmessageV2"),
      params: {
        conversationId: body.conversationId,
      },
    }).then((data) => data.data);
  },
};
