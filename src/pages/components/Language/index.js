import style from "./Language.module.scss";
import classNames from "classnames/bind";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";

const cx = classNames.bind(style);
function Language() {
  let dispatch = useDispatch();
  let language = useSelector(selector.language);
  function handleChangeLanguage(l) {
    dispatch(settingSlide.actions.setLanguage(l));
  }
  return (
    <div className={cx("language")}>
      <button
        className={cx(language == "vi" && "active")}
        onClick={() => handleChangeLanguage("vi")}
      >
        Tiếng Việt
      </button>
      <button
        className={cx(language == "en" && "active")}
        onClick={() => handleChangeLanguage("en")}
      >
        English
      </button>
    </div>
  );
}
export default Language;
