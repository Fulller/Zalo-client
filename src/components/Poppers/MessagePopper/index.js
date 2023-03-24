import classNames from "classnames/bind";
import style from "./MessagePopper.module.scss";
import popperStyle from "../Poppers.module.scss";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import { CoppyMessage, DeleteMessage, Recall } from "../components";
import useText from "../../../hooks/useText";

const cx = classNames.bind(style);
const cxpoper = classNames.bind(popperStyle);
function MessagePopper({ className, data, friend }) {
  let [visible, setVisible] = useState(false);
  let [mouseEnter, setMouseEnter] = useState(false);
  let text = useText("popper");
  useEffect(() => {
    let timeout = setInterval(() => {
      if (!mouseEnter) {
        setVisible(false);
      }
    }, 500);
    return function () {
      clearInterval(timeout);
    };
  }, [mouseEnter]);
  return (
    <div
      className={`${className} ${cx(["popper", data.isRecall && "isrecall"])}`}
      onMouseLeave={(e) => setMouseEnter(false)}
      onMouseEnter={(e) => setMouseEnter(true)}
    >
      <Tippy
        visible={visible}
        interactive
        render={() => (
          <div className={cxpoper("popper")} style={{ minWidth: "200px" }}>
            <CoppyMessage
              icon
              cx={cxpoper}
              setVisible={setVisible}
              data={data}
            ></CoppyMessage>
            <div className={cxpoper("line")}></div>
            <Recall
              icon
              cx={cxpoper}
              setVisible={setVisible}
              title={text.recall}
              data={data}
              friend={friend}
            ></Recall>
            <DeleteMessage
              icon
              cx={cxpoper}
              setVisible={setVisible}
              title={text.deletemyside}
              data={data}
            ></DeleteMessage>{" "}
          </div>
        )}
        onClickOutside={() => setVisible(false)}
      >
        <button className={cx("button")} onClick={() => setVisible(!visible)}>
          <span className="material-symbols-rounded">more_horiz</span>
        </button>
      </Tippy>
    </div>
  );
}
export default MessagePopper;
