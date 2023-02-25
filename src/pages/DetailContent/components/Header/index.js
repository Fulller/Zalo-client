import style from "./Header.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import useText from "../../../../hooks/useText";
import { useDispatch } from "react-redux";
import settingSlide from "../../../../redux/slides/setting";

const cx = classNames.bind(style);
function Header({ data }) {
  let dispatch = useDispatch();
  let text = useText("detailcontent");
  function Main() {
    switch (data.type) {
      case "chat-friend":
        let friend = data.data.friend;
        return (
          <>
            <img src={friend.avatar} width="100"></img>
            <div className={cx("info")}>
              <h4>{friend.showName}</h4>
            </div>
            <div className={cx("buttons")}>
              <Tippy
                delay={[500, 0]}
                content={<span>{text.findinmessage}</span>}
              >
                <button>
                  <span className="material-symbols-rounded">search</span>
                </button>
              </Tippy>
              <Tippy
                delay={[500, 0]}
                content={<span>{text.infoconversation}</span>}
              >
                <button
                  onClick={() =>
                    dispatch(settingSlide.actions.toggleShowinfocontent())
                  }
                >
                  <span className="material-symbols-rounded">
                    right_panel_close
                  </span>
                </button>
              </Tippy>
            </div>
          </>
        );
    }
  }
  return (
    <div className={cx("header")}>
      <Main></Main>
    </div>
  );
}
export default Header;
