import classnames from "classnames/bind";
import layoutStyle from "../DetailContent.module.scss";
import style from "./RequestFriend.module.scss";
import useText from "../../../hooks/useText";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import UserItem from "../../components/UserItem";
import services from "../../../services";
import datauserSlide from "../../../redux/slides/datauser";

const cxlayout = classnames.bind(layoutStyle);
const cx = classnames.bind(style);
function RequestFriend() {
  let dispatch = useDispatch();
  let text = useText("navlist");
  let data = useSelector(selector.datauser.resquestfriends);
  let wanttobefriends = useSelector(selector.datauser.wanttobefriends);
  let user = useSelector(selector.user);
  async function agreeAddFriend(user, friend) {
    let response = await services.addfriend({
      userName: user.userName,
      userNameFriend: friend.userName,
    });
    if (response.isSuccess) {
      dispatch(datauserSlide.actions.addFriend(friend));
    }
  }
  return (
    <div className={cxlayout("layout1")}>
      <header>
        <span className="material-symbols-rounded">mail</span>
        <h4>{text.requestfriend}</h4>
      </header>
      <div className={cxlayout("main")}>
        <div className={cx("list")}>
          <h1>{text.requestfriend}</h1>
          {data.map((friend, index) => {
            return (
              <UserItem
                key={friend.userName}
                type="1"
                data={friend}
                hasButton
              ></UserItem>
            );
          })}
        </div>
        <div className={cx("list")}>
          <h1>{text.waitingagree}</h1>
          {wanttobefriends.map((friend, index) => {
            return (
              <UserItem
                key={friend.userName}
                type="1"
                data={friend}
                hasButton
              ></UserItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default RequestFriend;
