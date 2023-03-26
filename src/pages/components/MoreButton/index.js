import style from "./MoreButton.module.scss";
import classNames from "classnames/bind";
import Headless from "@tippyjs/react/headless";
import { useState } from "react";
import useText from "../../../hooks/useText";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch } from "react-redux";
import datauserSlide from "../../../redux/slides/datauser";
import services from "../../../services";
import mergeUserName from "../../../tools/mergeUserName";

const cx = classNames.bind(style);
function MoreButton({ data: { user, friend }, type = "user" }) {
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
  async function handleClickClearConverstation() {
    let conversationId = mergeUserName(user.userName, friend.userName);
    let { isSuccess, data } = await services.clearconversation({
      userName: user.userName,
      conversationId,
    });
    if (isSuccess) {
      dispatch(
        datauserSlide.actions.setMessagesHistory(data.user.messagesHistory)
      );
      dispatch(
        datauserSlide.actions.setMessages({
          conversationId,
          messages: data.messages,
        })
      );
    }
  }
  return (
    <Headless
      visible={visible}
      placement="bottom-end"
      interactive={true}
      render={() => {
        switch (type) {
          case "user":
            return (
              <div className={cx("popper")}>
                <button onClick={handleClickShowInfoUser}>
                  {text.watchinfo}
                </button>
                <button>{text.namechangereminder}</button>
                <button
                  className={cx("important")}
                  onClick={handleClickClearBtn}
                >
                  {text.removefriend}
                </button>
              </div>
            );
          case "conversation":
            return (
              <div className={cx("popper")}>
                <button
                  className={cx("important")}
                  onClick={handleClickClearConverstation}
                >
                  Xóa cuộc hội thoại
                </button>
              </div>
            );
        }
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
