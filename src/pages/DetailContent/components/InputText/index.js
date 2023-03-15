import style from "./Inputtext.module.scss";
import classNames from "classnames/bind";
import useText from "../../../../hooks/useText";
import { useState, useEffect, useRef } from "react";
import { socket } from "../../../../components/Global";
import services from "../../../../services";
import mergeUserName from "../../../../tools/mergeUserName";
import Tippy from "@tippyjs/react";

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
  async function sendImage(e) {
    let response = await services.uploadImage(e.target.files[0]);
    console.log({ response });
    if (response.isSuccess) {
      let image = response.data;
      let conversationId = mergeUserName(
        data.user.userName,
        data.friend.userName
      );
      let responseMessage = await services.sendmessage({
        conversationId: conversationId,
        content: image,
        sender: data.user.userName,
        type: "image",
      });
      if (responseMessage.isSuccess) {
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
    <div className={cx("input-box")}>
      <div className={cx("send-options")}>
        <Tippy content={<span>Gửi hình ảnh</span>}>
          <label className={cx("send-option")} onInput={sendImage}>
            <input type="file"></input>
            <span className="material-symbols-rounded">image</span>
          </label>
        </Tippy>
      </div>
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
    </div>
  );
}
export default InputText;
