const serverurl = "http://localhost:3001";

export default {
  server: {
    userAPI: function (url) {
      return serverurl + "/api/user" + url;
    },
  },
};
