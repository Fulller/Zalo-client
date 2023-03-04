import style from "./InfoUser.module.scss";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";

const cx = classNames.bind(style);
function InfoUser({ data }) {
  let user = useSelector(selector.user);
  let isUser = user.userName == data?.userName;
  return (
    <div className={cx("infouser")}>
      <h3>Thông tin tài khoản</h3>
      <div className={cx("content")}>
        <img src={data.avatar}></img>
        <h4>{data.showName}</h4>
        <h5>Thông tin cá nhân</h5>
        <div className={cx("info-personals")}>
          <div className={cx("info-personal")}>
            <span>Username</span>
            <p>{data.userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoUser;
