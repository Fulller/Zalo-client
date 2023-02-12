import { Fragment } from "react";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Test from "../pages/Test";

function route(path, Page, Layout = Fragment) {
  this.path = path;
  this.element = (
    <Layout>
      <Page></Page>
    </Layout>
  );
}

export default {
  public: [
    new route("/login", Login),
    new route("/register", Register),
    new route("/", Home),
    new route("/home", Home),
    new route("/test", Test),
  ],
};
