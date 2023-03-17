import style from "./Header.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import useText from "../../../../hooks/useText";
import { useDispatch, useSelector } from "react-redux";
import settingSlide from "../../../../redux/slides/setting";
import Image from "../../../../Images";
import Avatar from "../../../components/Avatar";
import selector from "../../../../redux/selector";

const cx = classNames.bind(style);
function Header({ data }) {
  let dispatch = useDispatch();
  let text = useText("detailcontent");
  let isShowDetail = useSelector(selector.showinfocontent);
  function Main() {
    switch (data.type) {
      case "chat-friend":
        let friend = data.data.friend;
        return (
          <>
            <Avatar data={data?.data?.friend}>
              <Image src={friend.avatar} id width="100"></Image>
            </Avatar>
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
                  className={cx(isShowDetail && "active")}
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
