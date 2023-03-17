import { useState, useRef, useEffect } from "react";
import Image from "../../../../Images";

function Category({ category, data, cx, text }) {
  let [isShow, setIsShow] = useState(true);
  let contentRef = useRef();
  function Main() {
    switch (category) {
      case "image":
        let a = data.reverse();
        return (
          <div className={cx("category-images")}>
            {a.map((message) => {
              return (
                <div key={message._id} className={cx("category-image")}>
                  <Image src={message.content} id></Image>
                </div>
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
        <button className={cx("see-all")}>Xem tất cả</button>
      </div>
    </div>
  );
}
export default Category;
