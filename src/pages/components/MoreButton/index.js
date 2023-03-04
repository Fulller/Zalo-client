import style from "./MoreButton.module.scss";
import classNames from "classnames/bind";
import Headless from "@tippyjs/react/headless";
import { useState } from "react";
import useText from "../../../hooks/useText";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch } from "react-redux";

const cx = classNames.bind(style);
function MoreButton({ data: { user, friend } }) {
  let text = useText("popper");
  let dispatch = useDispatch();
  let [visible, setVisible] = useState(false);
  function handleClickClearBtn() {
    setVisible(false);
    dispatch(
      settingSlide.actions.setModule({
        isShow: true,
        type: "confirm",
        data: {
          type: "unfriend",
          user: user,
          friend: friend,
        },
      })
    );
  }
  function handleClickShowInfoUser() {
    setVisible(false);
    dispatch(
      settingSlide.actions.setModule({
        isShow: true,
        type: "infouser",
        data: friend,
      })
    );
  }
  return (
    <Headless
      visible={visible}
      placement="bottom-end"
      interactive={true}
      render={() => {
        return (
          <div className={cx("popper")}>
            <button onClick={handleClickShowInfoUser}>{text.watchinfo}</button>
            <button>{text.namechangereminder}</button>
            <button className={cx("btn-clear")} onClick={handleClickClearBtn}>
              {text.removefriend}
            </button>
          </div>
        );
      }}
      onClickOutside={() => setVisible(false)}
    >
      <button className={cx("moreButton")} onClick={() => setVisible(!visible)}>
        <span className="material-symbols-rounded">more_horiz</span>
      </button>
    </Headless>
  );
}
export default MoreButton;
