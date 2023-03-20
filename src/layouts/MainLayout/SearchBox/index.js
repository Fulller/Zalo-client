import style from "./SearchBox.module.scss";
import className from "classnames/bind";
import useText from "../../../hooks/useText";
import Tippy from "@tippyjs/react";
import { useState, useRef, useEffect } from "react";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch } from "react-redux";

const cx = className.bind(style);
function SearchBox() {
  let dispatch = useDispatch();
  let text = useText("mainlayout");
  let [searchtext, setSearchtext] = useState("");
  let [isInputFocus, setIsInputFocus] = useState(false);
  let inputRef = useRef();
  function hanldeClearSearchtext() {
    setSearchtext("");
    inputRef.current.focus();
  }

  return (
    <div className={cx("search-box")}>
      <div className={cx("search-input")}>
        <span className={cx(["material-symbols-rounded", "search-btn"])}>
          search
        </span>
        <input
          ref={inputRef}
          placeholder={text.search}
          value={searchtext}
          onChange={(e) => setSearchtext(e.target.value)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        ></input>
        <span
          className={cx([
            "material-symbols-rounded",
            "close-btn",
            !searchtext && "transparent",
          ])}
          onClick={hanldeClearSearchtext}
        >
          cancel
        </span>
      </div>
      <div className={cx(["adds", isInputFocus && "hide"])}>
        <Tippy delay={[500, 0]} content={<span>{text.addfriend}</span>}>
          <button
            className={cx("add-friend")}
            onClick={() =>
              dispatch(
                settingSlide.actions.setModule({
                  isShow: true,
                  type: "addfriend",
                })
              )
            }
          >
            <span className="material-symbols-rounded">person_add</span>
          </button>
        </Tippy>
        {/* <Tippy delay={[500, 0]} content={<span>{text.creategroupchat}</span>}>
          <button
            className={cx("add-group")}
            onClick={() =>
              dispatch(settingSlide.actions.setModule({ isShow: true }))
            }
          >
            <span className="material-symbols-rounded">group_add</span>
          </button>
        </Tippy> */}
      </div>
      <div
        className={cx(["closebtn", !isInputFocus && "hide"])}
        onClick={() => setSearchtext("")}
      >
        {text.close}
      </div>
    </div>
  );
}

export default SearchBox;
