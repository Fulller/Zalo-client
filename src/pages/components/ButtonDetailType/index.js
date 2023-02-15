import style from "../UserItem/UserItem.module.scss";
import className from "classnames/bind";

const cx = className.bind(style);

function ButtonDetailType({ data, handleClick }) {
  return (
    <div className={cx(["user-item", "button"])} onClick={handleClick}>
      <img src={data.avatar}></img>
      <div className={cx("info")}>
        <span>{data.showName}</span>
      </div>
    </div>
  );
}
export default ButtonDetailType;
