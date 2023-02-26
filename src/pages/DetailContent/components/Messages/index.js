import style from "./Messages.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);
function Messages({ data }) {
  let dataMessages = data.data;
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
          let time = message.createdAt.slice(11, 16);
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
                <img className={cx("avatar")} src={avatar}></img>
                <div className={cx("content")}>
                  <p>{message.content}</p>
                  <div className={cx("time")}>{time}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Messages;
