import style from "./ChatFriend.module.scss";
import layoutStyle from "../DetailContent.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";

import Header from "../components/Header";
import InputText from "../components/InputText";
import Messages from "../components/Messages";

const cxlayout = classNames.bind(layoutStyle);
function ChatFriend({ data }) {
  let showinfocontent = useSelector(selector.showinfocontent);

  return (
    <div className={cxlayout("layout2")}>
      <div className={cxlayout("left")}>
        <div className={cxlayout("header")}>
          <Header data={data}></Header>
        </div>
        <div className={cxlayout("messages")}>
          <Messages data={data}></Messages>
        </div>
        <div className={cxlayout("input")}>
          <InputText data={data}></InputText>
        </div>
      </div>
      <div
        className={cxlayout(["right", !showinfocontent && "hideInfoContent"])}
      >
        <div className={cxlayout("title")}>title</div>
        <div className={cxlayout("detaildata")}>detaildata</div>
      </div>
    </div>
  );
}
export default ChatFriend;
