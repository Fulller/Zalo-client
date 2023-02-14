import { Fragment } from "react";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import NoPage from "../pages/NoPage";

function route(path, Element, Layout) {
  this.path = path;
  this.element = Layout ? (
    <Layout
      element1={Element?.element1}
      element2={Element?.element2}
      element3={Element?.element3}
      element4={Element?.element4}
      element5={Element?.element5}
    ></Layout>
  ) : (
    <Element></Element>
  );
}

export default {
  public: [
    new route("/login", Login),
    new route("/register", Register),
    new route(
      "/",
      {
        element1: <h1>Element1</h1>,
        element2: <h1>Element2</h1>,
      },
      MainLayout
    ),
    new route(
      "/message",
      {
        element1: <h1>Element1</h1>,
        element2: <h1>Element2</h1>,
      },
      MainLayout
    ),

    new route("/*", NoPage),
  ],
};
