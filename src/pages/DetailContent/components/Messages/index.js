import style from "./Messages.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector } from "react-redux";
import selector from "../../../../redux/selector";
import Image from "../../../../Images";

const cx = classNames.bind(style);
function Messages({ data }) {
  let dataMessages = data.data;
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
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });
  return (
    <div className={cx("messages")} ref={messagesRef}>
      {conversation &&
        conversation.messages.map((message, index) => {
          let avatar = conversation.members.find((member) => {
            return member.userName == message.sender;
          })?.avatar;
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
                <Image
                  isuser="true"
                  className={cx("avatar")}
                  src={avatar}
                ></Image>
                <div className={cx("content")}>
                  <p className={cx(!showinfocontent && "wide")}>
                    {message.content}
                  </p>
                  <div className={cx("time")}>
                    {(time[0] * 1 + 7) % 24}:{time[1]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Messages;
