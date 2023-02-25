import style from "./UserItem.module.scss";
import classNames from "classnames/bind";
import useText from "../../../hooks/useText";
import useRelationship from "../../../hooks/useRelationship";
import datauserSlide from "../../../redux/slides/datauser";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";
import { useEffect, useState } from "react";
import services from "../../../services";

import MoreButton from "../MoreButton";

const cx = classNames.bind(style);
function UserItem({
  type = "1",
  data,
  hasButton = false,
  clickToChat = false,
  moreButton = false,
}) {
  let text = useText("detailcontent");
  let relationship = useRelationship(data.userName);
  let [dataButton, setDatabutton] = useState({});
  let user = useSelector(selector.user);
  let dispatch = useDispatch();

  function handleClickToChat() {
    dispatch(
      settingSlide.actions.detailcontent({
        type: "chat-friend",
        data: {
          user: user,
          friend: data,
        },
      })
    );
  }
  useEffect(() => {
    let title = "";
    let handleClick = function () {};
    let isDisable = false;
    let response;
    switch (relationship) {
      case "requested":
        title = text.agree;
        handleClick = async function () {
          response = await services.addfriend({
            userName: user.userName,
            userNameFriend: data.userName,
          });
          if (response.isSuccess) {
            dispatch(datauserSlide.actions.addFriend(data));
          }
        };
        break;
      case "wanttobe":
        title = text.waitingagree;
        isDisable = true;
        break;
      case "notfriend":
        title = text.addfriend;
        handleClick = async function (e) {
          response = await services.wanttobefriend({
            userName: user.userName,
            userNameFriend: data.userName,
          });
          if (response.isSuccess) {
            dispatch(datauserSlide.actions.wanttobeFriend(data));
          }
        };
        break;
      case "friend":
        title = text.isfriend;
        isDisable = true;
        break;
    }
    setDatabutton({ title, handleClick, isDisable });
  }, [relationship]);
  return (
    <div
      className={cx(["useritem", "type" + type])}
      onClick={(e) => {
        if (clickToChat || relationship == "friend") {
          if (!e.target.closest("button")) {
            handleClickToChat();
          }
        }
      }}
    >
      <img src={data.avatar}></img>
      <div className={cx("content")}>
        <h4>{data.showName}</h4>
        {hasButton && (
          <button
            className={cx(["button", dataButton.isDisable && "disable"])}
            onClick={dataButton?.handleClick}
          >
            {dataButton.title}
          </button>
        )}
        {moreButton && (
          <MoreButton
            data={{
              user: user,
              friend: data,
            }}
          ></MoreButton>
        )}
      </div>
    </div>
  );
}
export default UserItem;
