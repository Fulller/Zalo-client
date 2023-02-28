import style from "../Poppers.module.scss";
import classNames from "classnames/bind";
import { Info, Logout, Setting } from "../components";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import useText from "../../../hooks/useText";

const cx = classNames.bind(style);
function UserPopper() {
  let text = useText("popper");
  let user = useSelector(selector.user);
  return (
    <div className={cx("popper")} style={{ minWidth: "300px" }}>
      <h3 className={cx("title")}>{user.showName}</h3>
      <div className={cx("line")}></div>
      <Info cx={cx} title={text.infoofyou}></Info>
      <Setting cx={cx} title={text.setting}></Setting>
      <div className={cx("line")}></div>
      <Logout cx={cx} title={text.logout}></Logout>
    </div>
  );
}
export default UserPopper;
