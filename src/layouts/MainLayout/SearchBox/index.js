import style from "./SearchBox.module.scss";
import className from "classnames/bind";
import useText from "../../../hooks/useText";
import Tippy from "@tippyjs/react";
import { useState, useRef, useEffect } from "react";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";
import removeVietnameseTones from "../../../tools/removeVietnameseTones";

const cx = className.bind(style);
function SearchBox() {
  let friends = useSelector(selector.datauser.friends);
  let conversations = useSelector(selector.datauser.conversations);
  let dispatch = useDispatch();
  let text = useText("mainlayout");
  let [searchtext, setSearchtext] = useState("");
  let [isInputFocus, setIsInputFocus] = useState(false);
  let [result, setResult] = useState({
    friends: [],
    messages: [],
  });
  let inputRef = useRef();
  function hanldeClearSearchtext() {
    setSearchtext("");
    inputRef.current.focus();
  }
  useEffect(() => {
    dispatch(
      settingSlide.actions.setSearchnavlist({
        isShow: isInputFocus,
        data: result,
      })
    );
  }, [isInputFocus, result]);
  useEffect(() => {
    let timeoutSearch = setTimeout(() => {
      let resultFriends = !!searchtext.trim()
        ? friends.filter((friend) => {
            return removeVietnameseTones(
              friend.showName.toLowerCase()
            ).includes(removeVietnameseTones(searchtext.toLowerCase()));
          })
        : [];
      setResult({ friends: resultFriends });
    }, 500);
    return () => {
      clearInterval(timeoutSearch);
    };
  }, [searchtext]);
  function handleClick(e) {
    console.log(e);
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
          type="text"
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
