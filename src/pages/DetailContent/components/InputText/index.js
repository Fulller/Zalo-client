import style from "./Inputtext.module.scss";
import classNames from "classnames/bind";
import useText from "../../../../hooks/useText";
import { useState, useEffect, useRef } from "react";
import { socket } from "../../../../components/Global";
import services from "../../../../services";
import mergeUserName from "../../../../tools/mergeUserName";

const cx = classNames.bind(style);
function InputText({ data: { data } }) {
  let text = useText("detailcontent");
  let [message, setMessage] = useState("");
  let inputRef = useRef();
  async function sendMessage() {
    if (message.trim()) {
      let conversationId = mergeUserName(
        data.user.userName,
        data.friend.userName
      );
      let response = await services.sendmessage({
        conversationId: conversationId,
        content: message.trim(),
        sender: data.user.userName,
      });
      if (response.isSuccess) {
        socket.emit("sendMessageToFriend", {
          senderId: data.user.userName,
          receiveId: data.friend.userName,
          conversationId,
        });
        setMessage("");
      }
    }
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className={cx("inputtext")}>
      <input
        ref={inputRef}
        placeholder={text.inputmesageto + data?.friend?.showName}
        spellCheck="false"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            sendMessage();
          }
        }}
      ></input>
      <button
        className={cx(!message.trim() && "hasnotmessage")}
        onClick={sendMessage}
      >
        {text.send}
      </button>
    </div>
  );
}
export default InputText;
