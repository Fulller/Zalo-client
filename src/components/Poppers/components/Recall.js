import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import services from "../../../services";
import datauserSlide from "../../../redux/slides/datauser";
import { socket } from "../../../components/Global";

function Recall({ cx, title, icon, data, friend }) {
  let user = useSelector(selector.user);
  let isSenderMessage = user.userName == data.sender;
  let dispatch = useDispatch();
  async function handleRecall() {
    let response = await services.recallmessage({
      id: data._id,
      userName: data.sender,
    });
    if (response.isSuccess) {
      dispatch(
        datauserSlide.actions.updatemessage({
          message: response.data,
        })
      );
      socket.emit("recallmessage", {
        userName: user.userName,
        userNameFriend: friend.userName,
        message: response.data,
      });
    }
  }
  return (
    <>
      {isSenderMessage && (
        <div
          className={cx(["popper-item", "important"])}
          onClick={handleRecall}
        >
          {icon && (
            <button className={cx("icon")}>
              <span className="material-symbols-rounded">rotate_left</span>
            </button>
          )}
          <span className={cx("title-item")}>{title}</span>
        </div>
      )}
    </>
  );
}
export default Recall;
