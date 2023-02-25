import style from "./Inputtext.module.scss";
import classNames from "classnames/bind";
import useText from "../../../../hooks/useText";
import { useState } from "react";

const cx = classNames.bind(style);
function InputText({ data }) {
  let text = useText("detailcontent");
  let [message, setMessage] = useState("");
  function sendMessage() {
    if (message.trim()) {
      console.log(message);
      setMessage("");
    }
  }
  return (
    <div className={cx("inputtext")}>
      <input
        placeholder={text.inputmesageto + data.data?.friend?.showName}
        spellCheck="false"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
