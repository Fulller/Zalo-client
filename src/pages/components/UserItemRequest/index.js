import style from "../UserItem/UserItem.module.scss";
import className from "classnames/bind";
import services from "../../../services";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";

const cx = className.bind(style);
function UserItemRequest({ data, handleClick }) {
  let user = useSelector(selector.user);
  return (
    <div className={cx(["user-item"])}>
      <img src={data.avatar}></img>
      <div className={cx("info")}>
        <span>{data.showName}</span>
      </div>
      <button
        className={cx("btnOK")}
        onClick={async () => {
          await services.addfriend({
            userName: user.userName,
            userNameFriend: data.userName,
          });
        }}
      >
        Đồng ý
      </button>
    </div>
  );
}
export default UserItemRequest;
