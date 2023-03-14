const serverurl = "http://localhost:3001";

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
  socket: "http://localhost:3002",
};
