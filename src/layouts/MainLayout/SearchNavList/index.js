import style from "./SearchNavList.module.scss";
import classNames from "classnames/bind";
import UserItem from "../../../pages/components/UserItem";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import mergeUserName from "../../../tools/mergeUserName";

const cx = classNames.bind(style);
function SearchNavList({ data: { friends, messages }, category, setCategory }) {
  let friendsdata = useSelector(selector.datauser.friends);
  let user = useSelector(selector.user);
  function Friends() {
    return (
      <div className={cx("friends")}>
        <h5>{`Trò truyện (${friends.length})`}</h5>
        {friends.map((friend, index) => {
          if (category == "all" && index >= 5) {
            return;
          }
          return (
            <UserItem key={friend.userName} data={friend} type="3"></UserItem>
          );
        })}
        {category == "all" && (
          <button
            className={cx("seeall")}
            onClick={() => setCategory("conversation")}
          >
            Xem tất cả tin trò truyện
          </button>
        )}
      </div>
    );
  }
  function Messages() {
    return (
      <div className={cx("messages")}>
        <h5>{`Tin nhắn (${messages.length})`}</h5>
        {messages.map((message, index) => {
          if (category == "all" && index >= 5) {
            return;
          }
          let friend = friendsdata.find((frienddata) => {
            return (
              mergeUserName(user.userName, frienddata.userName) ==
              message.conversationId
            );
          });
          return (
            <UserItem
              key={message._id}
              data={friend}
              lastMessage={message}
              type="3"
            ></UserItem>
          );
        })}
        {category == "all" && (
          <button
            className={cx("seeall")}
            onClick={() => setCategory("message")}
          >
            Xem tất cả tin tin nhắn
          </button>
        )}
      </div>
    );
  }
  function All() {
    return (
      <>
        <Friends></Friends>
        <Messages></Messages>
      </>
    );
  }
  return (
    <div className={cx(["search-nav-list"])}>
      {category == "all" && <All></All>}
      {category == "conversation" && <Friends></Friends>}
      {category == "message" && <Messages></Messages>}
    </div>
  );
}
export default SearchNavList;
