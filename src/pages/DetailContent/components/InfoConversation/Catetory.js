import { useState, useRef, useEffect } from "react";
import Image from "../../../../Images";
import iconlink from "./link.png";
import { userSelector, useSelector } from "react-redux";
import selector from "../../../../redux/selector";

function Category({ category, data, cx, text }) {
  let user = useSelector(selector.user);
  let [isShow, setIsShow] = useState(true);
  let contentRef = useRef();
  function Main() {
    switch (category) {
      case "image":
        data = data.reverse();
        return (
          <div className={cx("category-images")}>
            {data.map((message) => {
              if (
                message.isRecall ||
                message.deleteBy.find((userName) => {
                  return user.userName == userName;
                })
              ) {
                return;
              }
              return (
                <div key={message._id} className={cx("category-image")}>
                  <Image src={message.content} id></Image>
                </div>
              );
            })}
          </div>
        );
      case "link":
        if (data.length > 3) {
          data.length = 3;
        }
        return (
          <div className={cx("category-links")}>
            {data.map((link) => {
              let date = new Date(link.createdAt);
              let shortlink = link.content.split("//")[1].split("/")[0];
              if (
                link.isRecall ||
                link.deleteBy.find((userName) => {
                  return user.userName == userName;
                })
              ) {
                return;
              }
              return (
                <a
                  href={link.content}
                  target="_blank"
                  key={link._id}
                  className={cx("category-link")}
                >
                  <div className={cx("wrappericon")}>
                    <Image src={iconlink} className={cx("icon")}></Image>
                  </div>
                  <div className={cx("wrapperlink")}>
                    <h4>{link.content}</h4>
                    <div>
                      <span className={cx("shortlink")}>{shortlink}</span>
                      <span> {`${date.getDate()}/${date.getMonth() + 1}`}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={cx("category")}>
      <div className={cx("heading")} onClick={() => setIsShow(!isShow)}>
        <h4>{text[category]}</h4>
        <span
          className={cx([
            "material-symbols-outlined",
            isShow ? "icon-show" : "icon-hide",
          ])}
        >
          arrow_drop_down
        </span>
      </div>
      <div
        ref={contentRef}
        className={cx(["content", isShow ? "show" : "hide"])}
      >
        <div className={cx("main")}>
          <Main></Main>
        </div>
        <button className={cx("see-all")}>{text.seeall}</button>
      </div>
    </div>
  );
}
export default Category;
