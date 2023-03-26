import useText from "../../../hooks/useText";
import url from "../../../tools/url";
import { useDispatch } from "react-redux";
import settingSlide from "../../../redux/slides/setting";

function CoppyMessage({ cx, icon, data, setVisible }) {
  let text = useText("popper");
  let dispatch = useDispatch();
  async function handleCopyMessage() {
    switch (data.type) {
      case "message":
      case "link":
        navigator.clipboard.writeText(data.content);
        break;
      case "image":
        navigator.clipboard.writeText(url.server.getImage(data.content));
        break;
    }
    // dispatch(
    //   settingSlide.actions.setNotification({
    //     isShow: true,
    //     type: "copy",
    //   })
    // );
    setVisible(false);
  }
  function getdisplay(type) {
    switch (type) {
      case "message":
        return { title: text.copymessage, icon: "content_copy" };
      case "image":
        return { title: text.copyimage, icon: "image" };
      case "link":
        return { title: text.copylink, icon: "link" };
    }
  }
  return (
    <div className={cx(["popper-item"])} onClick={handleCopyMessage}>
      {icon && (
        <button className={cx("icon")}>
          <span className="material-symbols-rounded">
            {getdisplay(data.type).icon}
          </span>
        </button>
      )}
      <span className={cx("title-item")}>{getdisplay(data.type).title}</span>
    </div>
  );
}
export default CoppyMessage;
