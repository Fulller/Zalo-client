import style from "./Module.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import settingSlide from "../../redux/slides/setting";
import selector from "../../redux/selector";

import Addfriend from "./Addfriend";
import Confirm from "./Confirm";

const cx = classNames.bind(style);
function Module() {
  let dispatch = useDispatch();
  let module = useSelector(selector.module);
  function Main() {
    switch (module?.type) {
      case "addfriend":
        return <Addfriend></Addfriend>;
      case "confirm":
        return <Confirm data={module.data}></Confirm>;
      default:
        return <></>;
    }
  }
  return (
    <div
      className={cx(["module", !module?.isShow && "hide"])}
      onClick={(e) =>
        !e.target.closest("." + cx("container")) &&
        dispatch(settingSlide.actions.setModule({ isShow: false }))
      }
    >
      <div className={cx("container")}>
        <span
          className={cx(["material-symbols-rounded", "closebtn"])}
          onClick={() =>
            dispatch(settingSlide.actions.setModule({ isShow: false }))
          }
        >
          close
        </span>
        <Main></Main>
      </div>
    </div>
  );
}
export default Module;
