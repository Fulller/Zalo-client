import style from "./Messages.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect, useRef, memo } from "react";
import mergeUserName from "../../../../tools/mergeUserName";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../../redux/selector";
import Image from "../../../../Images";
import Avatar from "../../../components/Avatar";
import MessagePopper from "../../../../components/Poppers/MessagePopper";
import settingSlide from "../../../../redux/slides/setting";
import { useMediaQuery } from "react-responsive";
import useText from "../../../../hooks/useText";
import services from "../../../../services";
import datauserSlide from "../../../../redux/slides/datauser";
import Background from "../../../../layouts/Module/components/Background";
import { socket } from "../../../../components/Global";

const cx = classNames.bind(style);
function Messages({ data, friend }) {
  let text = useText("detailcontent");
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  let user = useSelector(selector.user);
  let dataMessages = data.data;
  let dispatch = useDispatch();
  let friendsMap = useSelector(selector.datauser.friendsMap);
  let showinfocontent = useSelector(selector.showinfocontent);
  let [photos, setPhotos] = useState([]);
  let [hasMessage, setHasMessage] = useState(true);
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
    let timeout = setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
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
  useEffect(() => {
    let lastMessage = conversation?.messages[conversation?.messages.length - 1];
    if (lastMessage) {
      if (
        lastMessage?.status != "seen" &&
        lastMessage?.sender != user.userName
      ) {
        (async function () {
          let response = await services.seenmessage({
            id: lastMessage._id,
          });
          if (response.isSuccess) {
            socket.emit("seenmessage", {
              userNameFriend: friend.userName,
              message: response.data,
            });
            dispatch(
              datauserSlide.actions.updatemessage({ message: response.data })
            );
          }
        })();
      }
    }
    setHasMessage(
      conversation?.messages.some(
        (message) =>
          !message.deleteBy.some((userName) => userName == user.userName)
      )
    );
  }, [conversation?.messages]);
  function Content({ message, time, index }) {
    let hour = time.getHours();
    let minute = time.getMinutes();
    time = `${hour}:${minute < 10 ? "0" + minute : minute}`;
    function TimeAndStatus() {
      return (
        <div className={cx("time-and-status")}>
          <span className={cx("time")}>{time}</span>
          {conversation.messages.length - 1 == index && (
            <span className={cx("status")}>{text[message.status]}</span>
          )}
        </div>
      );
    }
    if (message.isRecall) {
      return (
        <div className={cx("content")}>
          <p className={cx([!showinfocontent && "wide", "recall"])}>
            Tin nhắn đã được thu hồi
          </p>
          <TimeAndStatus></TimeAndStatus>
        </div>
      );
    }
    switch (message.type) {
      case "message":
        return (
          <div className={cx("content")}>
            <p className={cx(!showinfocontent && "wide")}>{message.content}</p>
            <TimeAndStatus></TimeAndStatus>
          </div>
        );
      case "link":
        return (
          <div className={cx("content")} onClick={() => console.log("oker")}>
            <a href={message.content} target="_blank">
              <p className={cx(!showinfocontent && "wide")}>
                {message.content}
              </p>
            </a>
            <TimeAndStatus></TimeAndStatus>
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
            <TimeAndStatus></TimeAndStatus>
          </div>
        );
    }
  }
  function NoMessage({ friend }) {
    return (
      <div className={cx("no-message")}>
        <div className={cx("header")}>
          <Avatar data={friend}>
            <Image src={friend.avatar} id className={cx("avatar")}></Image>
          </Avatar>
          <div className={cx("info")}>
            <h4>{friend.showName}</h4>
            <p>{text.letstartshareing}</p>
          </div>
        </div>
        <Background
          src={friend.background}
          id
          className={cx("background")}
        ></Background>
      </div>
    );
  }
  return (
    <div className={cx("messages")} ref={messagesRef}>
      {conversation && hasMessage ? (
        conversation.messages.map((message, index) => {
          let sender = friendsMap[message?.sender];
          let avatar = sender?.avatar;
          let time = new Date(message.createdAt);
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
                <Content message={message} time={time} index={index}></Content>
                <MessagePopper
                  data={message}
                  className={cx("popper")}
                  friend={friend}
                ></MessagePopper>
              </div>
            </div>
          );
        })
      ) : (
        <NoMessage friend={friend}></NoMessage>
      )}
    </div>
  );
}
export default Messages;
