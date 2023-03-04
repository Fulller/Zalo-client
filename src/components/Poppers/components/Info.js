import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import settingSlide from "../../../redux/slides/setting";

function Info({ cx, title, icon, setVisible }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  function handleClick() {
    setVisible(false);
    dispatch(
      settingSlide.actions.setModule({
        isShow: true,
        type: "infouser",
        data: user,
      })
    );
  }
  return (
    <div className={cx("popper-item")} onClick={handleClick}>
      {icon && <button className={cx("icon")}>{icon}</button>}
      <span className={cx("title-item")}>{title}</span>
    </div>
  );
}
export default Info;
