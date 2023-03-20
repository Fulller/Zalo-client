import style from "./MessagesHIstory.module.scss";
import classNames from "classnames/bind";
import datauserSlide from "../../../redux/slides/datauser";
import settingSlide from "../../../redux/slides/setting";
import selector from "../../../redux/selector";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "../../components/UserItem";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(style);
function MessagesHistory() {
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  let user = useSelector(selector.user);
  let friendsMap = useSelector(selector.datauser.friendsMap);
  let detailcontent = useSelector(selector.detailcontent);
  let dispatch = useDispatch();
  let conversations = useSelector(selector.datauser.conversations);
  let messagesHistory = useSelector(selector.datauser.messageshistory).map(
    (conversationId) => {
      return conversations[conversationId];
    }
  );
  useEffect(() => {
    if (!isMobile) {
      if (messagesHistory[0]) {
        dispatch(
          settingSlide.actions.detailcontent({
            type: "chat-friend",
            data: {
              user: user,
              friend:
                friendsMap[
                  messagesHistory[0].members.find((member) => {
                    return member != user.userName;
                  })
                ],
            },
          })
        );
      }
    }
  }, []);
  return (
    <div className={cx("messagehistory")}>
      {messagesHistory &&
        messagesHistory.map((conversation) => {
          let friend = conversation?.members.find((member) => {
            return member != user.userName;
          });
          friend = friendsMap[friend];
          let isActive =
            detailcontent?.type == "chat-friend" &&
            detailcontent?.data?.friend?.userName == friend?.userName;
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
                active={isActive}
              ></UserItem>
            );
          }
        })}
    </div>
  );
}
export default MessagesHistory;
