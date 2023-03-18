import style from "./Messages.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector } from "react-redux";
import selector from "../../../../redux/selector";
import Image from "../../../../Images";
import Avatar from "../../../components/Avatar";

const cx = classNames.bind(style);
function Messages({ data }) {
  let dataMessages = data.data;
  let friendsMap = useSelector(selector.datauser.friendsMap);
  let showinfocontent = useSelector(selector.showinfocontent);
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
          let avatar = friendsMap[message?.sender]?.avatar;
          let time = message.createdAt.slice(11, 16).split(":");
          let messageType = [];
          if (message.sender != conversation.messages[index - 1]?.sender) {
            messageType.push("type1");
          }
          if (message.sender != conversation.messages[index + 1]?.sender) {
            messageType.push("type2");
          }

          return (
            <div
              key={message._id}
              className={cx([
                "wrappermessage",
                dataMessages.user.userName == message.sender && "right",
              ])}
            >
              <div className={cx(["message", ...messageType])}>
                <Avatar data={friendsMap[message?.sender]}>
                  <Image className={cx("avatar")} src={avatar} id></Image>
                </Avatar>
                <Content message={message} time={time}></Content>
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
