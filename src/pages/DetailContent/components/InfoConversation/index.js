import style from "./InfoConversation.module.scss";
import classNames from "classnames/bind";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector } from "react-redux";
import selector from "../../../../redux/selector";
import Avatar from "../../../components/Avatar";
import Image from "../../../../Images";
import useText from "../../../../hooks/useText";
import Category from "./Catetory";

const cx = classNames.bind(style);
function InfoConversation({ data }) {
  let conversationMap = useSelector(selector.datauser.conversations);
  let text = useText("detailcontent");
  let { friend } = data.data;
  let conversation =
    conversationMap[
      mergeUserName(data.data.user.userName, data.data.friend.userName)
    ];
  let images = conversation?.messages.filter((message, index) => {
    return message.type == "image";
  });
  return (
    <>
      {conversation && (
        <div className={cx("infoconversation")}>
          <div className={cx("header")}>
            <Avatar data={friend}>
              <Image className={cx("avatar")} src={friend.avatar} id></Image>
            </Avatar>
            <h3>{friend.showName}</h3>
          </div>
          <Category
            category="image"
            data={images.reverse()}
            cx={cx}
            text={text}
          ></Category>
          <Category
            category="image"
            data={images.reverse()}
            cx={cx}
            text={text}
          ></Category>
          <Category
            category="image"
            data={images.reverse()}
            cx={cx}
            text={text}
          ></Category>
        </div>
      )}
    </>
  );
}
export default InfoConversation;
