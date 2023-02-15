import Login from "../pages/Login";
import Register from "../pages/Register";
import NoPage from "../pages/NoPage";
import MainLayout from "../layouts/MainLayout";
import PhoneBookNav from "../pages/components/PhonebookNav";
import DetailContent from "../pages/components/DetailContent";
import MessageHistoryNav from "../pages/components/MessageHistoryNav";

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
    new route("login", Login),
    new route("register", Register),
    new route("", [MessageHistoryNav, DetailContent], MainLayout),
    new route("message", [MessageHistoryNav, DetailContent], MainLayout),
    new route("phonebook", [PhoneBookNav, DetailContent], MainLayout),
    new route("*", NoPage),
  ],
};
