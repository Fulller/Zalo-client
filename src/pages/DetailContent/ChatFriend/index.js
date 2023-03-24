import layoutStyle from "../DetailContent.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import useText from "../../../hooks/useText";

import Header from "../components/Header";
import InputText from "../components/InputText";
import Messages from "../components/Messages";
import InfoConversation from "../components/InfoConversation";
import Image from "../../../Images";

const cxlayout = classNames.bind(layoutStyle);
function ChatFriend({ data }) {
  let showinfocontent = useSelector(selector.showinfocontent);
  let text = useText("detailcontent");
  return (
    <div className={cxlayout("layout2")}>
      <div className={cxlayout("left")}>
        <div className={cxlayout("header")}>
          <Header data={data}></Header>
        </div>
        <div className={cxlayout("messages")} style={{ position: "relative" }}>
          <Image
            className={cxlayout("background")}
            src={data?.data?.friend?.avatar}
            id
          ></Image>
          <Messages data={data} friend={data?.data?.friend}></Messages>
        </div>
        <div className={cxlayout("input")}>
          <InputText data={data}></InputText>
        </div>
      </div>
      <div
        className={cxlayout(["right", !showinfocontent && "hideInfoContent"])}
      >
        <div className={cxlayout("title")}>{text.infoconversation}</div>
        <InfoConversation data={data}></InfoConversation>
      </div>
    </div>
  );
}
export default ChatFriend;
