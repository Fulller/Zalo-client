import style from "./SearchBox.module.scss";
import className from "classnames/bind";
import useText from "../../../hooks/useText";
import Tippy from "@tippyjs/react";
import { useState, useRef, useEffect } from "react";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";
import mergeUserName from "../../../tools/mergeUserName";
import removeVietnameseTones from "../../../tools/removeVietnameseTones";

const cx = className.bind(style);
function SearchBox() {
  let user = useSelector(selector.user);
  let friends = useSelector(selector.datauser.friends);
  let conversations = useSelector(selector.datauser.conversations);
  let dispatch = useDispatch();
  let text = useText("mainlayout");
  let [searchtext, setSearchtext] = useState("");
  let isInputFocus = useRef(false);
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
        isShow: isInputFocus.current,
        data: result,
      })
    );
  }, [result]);
  useEffect(() => {
    if (!!searchtext.trim()) {
      isInputFocus.current = true;
    } else {
      isInputFocus.current = false;
    }
    let timeoutSearch = setTimeout(() => {
      let resultFriends = !!searchtext.trim()
        ? friends.filter((friend) => {
            return removeVietnameseTones(
              friend.showName.toLowerCase()
            ).includes(removeVietnameseTones(searchtext.toLowerCase()));
          })
        : [];

      let allmessages = friends.reduce((old, friend) => {
        let conversation =
          conversations[mergeUserName(user.userName, friend.userName)];
        return [...old, ...conversation.messages];
      }, []);
      let resultMessages = !!searchtext.trim()
        ? allmessages.filter((message) => {
            return (
              removeVietnameseTones(message.content.toLowerCase()).includes(
                removeVietnameseTones(searchtext.toLowerCase())
              ) &&
              !message.isRecall &&
              !message.deleteBy.includes(user.userName)
            );
          })
        : [];
      setResult({ friends: resultFriends, messages: resultMessages });
    }, 800);
    return () => {
      clearInterval(timeoutSearch);
    };
  }, [searchtext]);
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
          spellCheck={false}
          onChange={(e) => setSearchtext(e.target.value.trim())}
          onFocus={() => (isInputFocus.current = true)}
          onBlur={() => (isInputFocus.current = false)}
          type="text"
          onClick={(e) => e.preventDefault()}
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
      <div className={cx(["adds", isInputFocus.current && "hide"])}>
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
        className={cx(["closebtn", !isInputFocus.current && "hide"])}
        onClick={() => setSearchtext("")}
      >
        {text.close}
      </div>
    </div>
  );
}

export default SearchBox;
