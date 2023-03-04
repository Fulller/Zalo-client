import { useDispatch } from "react-redux";
import settingSlide from "../../../redux/slides/setting";

function Logout({ cx, title, icon, setVisible }) {
  let dispatch = useDispatch();
  function handleClickLogout() {
    setVisible(false);
    dispatch(
      settingSlide.actions.setModule({
        isShow: true,
        type: "confirm",
        data: {
          type: "logout",
        },
      })
    );
  }
  return (
    <div className={cx("popper-item")} onClick={handleClickLogout}>
      {icon && <button className={cx("icon")}>{icon}</button>}
      <span className={cx("title-item")}>{title}</span>
    </div>
  );
}
export default Logout;
