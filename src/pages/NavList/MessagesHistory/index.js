import style from "./MessagesHIstory.module.scss";
import classNames from "classnames/bind";
import datauserSlide from "../../../redux/slides/datauser";
import selector from "../../../redux/selector";
import { useSelector } from "react-redux";
import UserItem from "../../components/UserItem";

const cx = classNames.bind(style);
function MessagesHistory() {
  let user = useSelector(selector.user);
  let conversations = useSelector(selector.datauser.conversations);
  let messagesHistory = useSelector(selector.datauser.messageshistory).map(
    (conversationId) => {
      return conversations[conversationId];
    }
  );
  return (
    <div className={cx("messagehistory")}>
      {messagesHistory &&
        messagesHistory.map((conversation) => {
          let friend = conversation?.members.find((member) => {
            return member.userName != user.userName;
          });
          if (friend) {
            return (
              <UserItem
                key={friend?.userName}
                data={friend}
                type={3}
                lastMessage={
                  conversation?.messages[conversation?.messages.length - 1] ||
                  null
                }
                hoverMoreButton
              ></UserItem>
            );
          }
        })}
    </div>
  );
}
export default MessagesHistory;
