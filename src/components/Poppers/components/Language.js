import { useState } from "react";
import Headless from "@tippyjs/react/headless";
import flagvietnam from "../../../Images/vietnam.png";
import flagusa from "../../../Images/usa.png";
import settingSlide from "../../../redux/slides/setting";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";

function DetailLanguage({ cx, settingPopperVisible }) {
  let language = useSelector(selector.language);
  let dispatch = useDispatch();
  function hanldeChangeLanguage(l) {
    dispatch(settingSlide.actions.setLanguage(l));
    settingPopperVisible(false);
  }
  return (
    <div className={cx("child-popper")}>
      <div className={cx("item")} onClick={() => hanldeChangeLanguage("vi")}>
        <img src={flagvietnam}></img>
        <span className={cx("name-language")}>Tiếng Việt</span>
        <span
          className={cx([
            "material-symbols-outlined",
            "check-icon",
            language == "vi" && "check-icon-active",
          ])}
        >
          done
        </span>
      </div>
      <div className={cx("item")} onClick={() => hanldeChangeLanguage("en")}>
        <img src={flagusa}></img>
        <span className={cx("name-language")}>English</span>
        <span
          className={cx([
            "material-symbols-outlined",
            "check-icon",
            language == "en" && "check-icon-active",
          ])}
        >
          done
        </span>
      </div>
    </div>
  );
}
function Language({ cx, title, icon, setVisible: settingPopperVisible }) {
  let [visible, setVisible] = useState(false);
  return (
    <Headless
      visible={visible}
      render={() => {
        return (
          <DetailLanguage
            cx={cx}
            settingPopperVisible={settingPopperVisible}
          ></DetailLanguage>
        );
      }}
      onClickOutside={() => setVisible(false)}
      placement="right-start"
      interactive={true}
    >
      <div className={cx("popper-item")} onClick={() => setVisible(!visible)}>
        {icon && <button className={cx("icon")}>{icon}</button>}
        <span className={cx("title-item")}>{title}</span>
      </div>
    </Headless>
  );
}
export default Language;
