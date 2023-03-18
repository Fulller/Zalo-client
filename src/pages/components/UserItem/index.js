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
import Image from "../../../Images";
import MoreButton from "../MoreButton";
import { timeAgo } from "../.../../../../components/Global";
import { socket } from "../.././../components/Global";

const cx = classNames.bind(style);
function UserItem({
  type = "1",
  data,
  hasButton = false,
  clickToChat = false,
  moreButton = false,
  hoverMoreButton = false,
  lastMessage = null,
  active,
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
  function LastMessage({ data }) {
    switch (data.type) {
      case "image":
        return (
          <>
            <span className={cx(["material-symbols-rounded", "icon"])}>
              image
            </span>
            <span>{text.image}</span>
          </>
        );
      case "message":
        return <span>{data.content}</span>;
      case "link":
        return (
          <>
            <span className={cx(["material-symbols-rounded", "icon"])}>
              link
            </span>
            <span>Link</span>
          </>
        );
    }
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
            socket.emit("acceptrequestfriend", {
              userName: user.userName,
              userNameFriend: data.userName,
            });
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
            socket.emit("wanttobefriend", {
              userName: user.userName,
              userNameFriend: data.userName,
            });
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
      className={cx(["useritem", "type" + type, active && "active"])}
      onClick={(e) => {
        if (clickToChat || relationship == "friend") {
          if (!e.target.closest("button")) {
            handleClickToChat();
          }
        }
      }}
    >
      <Image src={data.avatar} id></Image>
      <div className={cx("content")}>
        <div className={cx("showname_lastmessage")}>
          <h4>{data.showName}</h4>
          {lastMessage && (
            <p>
              {lastMessage.sender == user.userName && `${text.you}: `}
              <LastMessage data={lastMessage}></LastMessage>
            </p>
          )}
        </div>
        {lastMessage && (
          <p className={cx("timeAgo")}>
            {timeAgo
              .format(new Date(lastMessage.createdAt))
              .replace(" trước", "")
              .replace(" ago", "")}
          </p>
        )}
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
        {hoverMoreButton && (
          <div className={cx("hoverMoreButton")}>
            <MoreButton
              data={{
                user: user,
                friend: data,
              }}
            ></MoreButton>
          </div>
        )}
      </div>
    </div>
  );
}
export default UserItem;
