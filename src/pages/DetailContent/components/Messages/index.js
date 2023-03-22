import style from "./Messages.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../../redux/selector";
import Image from "../../../../Images";
import Avatar from "../../../components/Avatar";
import MessagePopper from "../../../../components/Poppers/MessagePopper";
import settingSlide from "../../../../redux/slides/setting";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(style);
function Messages({ data }) {
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  let user = useSelector(selector.user);
  let dataMessages = data.data;
  let dispatch = useDispatch();
  let friendsMap = useSelector(selector.datauser.friendsMap);
  let showinfocontent = useSelector(selector.showinfocontent);
  let [photos, setPhotos] = useState([]);
  let conversationId =
    data.type == "chat-friend"
      ? mergeUserName(dataMessages.user.userName, dataMessages.friend.userName)
      : "";
  let conversation =
    useSelector((state) => {
      return state.datauser.conversations[conversationId];
    }) || null;
  let messagesRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 500);
  }, []);
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    if (conversation) {
      setPhotos(
        conversation.messages
          .filter((message) => {
            return message.type == "image";
          })
          .map((messageImage) => {
            return messageImage.content;
          })
      );
    }
  }, [conversation]);
  function Content({ message, time }) {
    switch (message.type) {
      case "message":
        return (
          <div className={cx("content")}>
            <p className={cx(!showinfocontent && "wide")}>{message.content}</p>
            <div className={cx("time")}>
              {(time[0] * 1 + 7) % 24}:{time[1]}
            </div>
          </div>
        );
      case "link":
        return (
          <div className={cx("content")}>
            <a href={message.content} target="_blank">
              <p className={cx(!showinfocontent && "wide")}>
                {message.content}
              </p>
            </a>
            <div className={cx("time")}>
              {(time[0] * 1 + 7) % 24}:{time[1]}
            </div>
          </div>
        );
      case "image":
        return (
          <div className={cx(["content", "content-image"])}>
            <Image
              className={cx(!showinfocontent && "wide")}
              src={message.content}
              id
              viewphotos={() =>
                dispatch(
                  settingSlide.actions.setViewphotos({
                    title:
                      friendsMap[
                        conversation.members.find(
                          (member) => member != user.userName
                        )
                      ]?.showName,
                    index: photos.indexOf(message.content),
                    photos: photos,
                  })
                )
              }
            ></Image>
            <div className={cx("time")}>
              {(time[0] * 1 + 7) % 24}:{time[1]}
            </div>
          </div>
        );
    }
  }
  return (
    <div className={cx("messages")} ref={messagesRef}>
      {conversation &&
        conversation.messages.map((message, index) => {
          let sender = friendsMap[message?.sender];
          let avatar = sender?.avatar;
          let time = message.createdAt.slice(11, 16).split(":");
          let messageType = [];
          if (message.sender != conversation.messages[index - 1]?.sender) {
            messageType.push("type1");
          }
          if (message.sender != conversation.messages[index + 1]?.sender) {
            messageType.push("type2");
          }
          let isDeleteOnMySide = !!message.deleteBy.find(
            (username) => username == user.userName
          );
          return (
            <div
              key={message._id}
              className={cx([
                "wrappermessage",
                dataMessages.user.userName == message.sender && "right",
                isMobile && "ismobile",
                isDeleteOnMySide && "isDeleteOnMySide",
              ])}
            >
              <div className={cx(["message", ...messageType])}>
                {(!isMobile ||
                  (isMobile && sender.userName != user.userName)) && (
                  <Avatar data={sender}>
                    <Image className={cx("avatar")} src={avatar} id></Image>
                  </Avatar>
                )}
                <Content message={message} time={time}></Content>
                <MessagePopper
                  data={message}
                  className={cx("popper")}
                ></MessagePopper>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Messages;
{
  /* {message.type == "image" ? (
                  <div className={cx("content-image")}>
                    <Image
                      className={cx(!showinfocontent && "wide")}
                      src={message.content}
                      id
                    ></Image>
                    <div className={cx("time")}>
                      {(time[0] * 1 + 7) % 24}:{time[1]}
                    </div>
                  </div>
                ) : (
                  <div className={cx("content")}>
                    <p className={cx(!showinfocontent && "wide")}>
                      {message.content}
                    </p>
                    <div className={cx("time")}>
                      {(time[0] * 1 + 7) % 24}:{time[1]}
                    </div>
                  </div>
                )} */
}
