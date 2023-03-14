import Login from "../pages/Login";
import NoPage from "../pages/NoPage";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import PhoneBookNav from "../pages/NavList/Phonebook";
import MessageHistoryNav from "../pages/NavList/MessagesHistory";
import Test from "../pages/Test";

function route(path, Element, Layout) {
  this.path = path;
  this.element = Layout ? (
    <Layout elements={Element}></Layout>
  ) : (
    <Element></Element>
  );
}
export default {
  public: [
    new route("test", Test),
    new route("login", Login),
    new route("register", Register),
    new route("", [MessageHistoryNav], MainLayout),
    new route("message", [MessageHistoryNav], MainLayout),
    new route("phonebook", [PhoneBookNav], MainLayout),
    new route("*", NoPage),
  ],
};
