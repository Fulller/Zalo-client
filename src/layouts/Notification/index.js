import { useSelector, useDispatch } from "react-redux";
import selector from "../../redux/selector";
import style from "./Notification.module.scss";
import clasNames from "classnames/bind";
import settingSlide from "../../redux/slides/setting";
import { useEffect } from "react";

const cx = clasNames.bind(style);
function Notification() {
  let notification = useSelector(selector.notification);
  let dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    if (notification.isShow) {
      timeout = setTimeout(() => {
        dispatch(
          settingSlide.actions.setNotification({
            isShow: false,
          })
        );
      }, 1900);
    }
    return function () {
      clearTimeout(timeout);
    };
  }, [notification.isShow]);
  switch (notification.type) {
    case "copy":
      return (
        <div
          className={cx([
            "notification",
            notification.type,
            !notification.isShow && "hide",
          ])}
        >
          Copy successful!
        </div>
      );
    default:
      return (
        <div
          className={cx(["notification", !notification.isShow && "hide"])}
        ></div>
      );
  }
}
export default Notification;
