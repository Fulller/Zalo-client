import style from "./UserItem.module.scss";
import className from "classnames/bind";

const cx = className.bind(style);
function UserItem({ data, handleClick, type = "friend" }) {
  return (
    <div className={cx(["user-item"])} onClick={handleClick}>
      <img src={data.avatar}></img>
      <div className={cx("info")}>
        <span>{data.showName}</span>
      </div>
      {type == "requesFriend" && (
        <button className={cx("btnOK")}>Đồng ý</button>
      )}
    </div>
  );
}
export default UserItem;
