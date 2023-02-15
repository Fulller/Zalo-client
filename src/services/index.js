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
};
