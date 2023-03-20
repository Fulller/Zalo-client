const serverurl = process.env.REACT_APP_SERVERURL;
const socket = process.env.REACT_APP_SOCKETURL;

export default {
  server: {
    userAPI: function (url) {
      return serverurl + "/api/user" + url;
    },
    imageAPI: function (url) {
      return serverurl + "/api/image" + url;
    },
    getImage: function (id) {
      return serverurl + "/api/image/get?id=" + id;
    },
  },
  socket: socket,
};
