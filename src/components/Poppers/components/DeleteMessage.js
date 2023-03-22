import services from "../../../services";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import datauserSlide from "../../../redux/slides/datauser";

function DeleteMessage({ cx, title, icon, setVisible, data }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  async function handleDeleteMessage() {
    let response = await services.deletemessageonmyside({
      id: data._id,
      userName: user.userName,
    });
    if (response.isSuccess) {
      dispatch(
        datauserSlide.actions.deleteonmyside({
          message: response.data,
        })
      );
    }
    setVisible(false);
  }
  return (
    <div
      className={cx(["popper-item", "important"])}
      onClick={handleDeleteMessage}
    >
      {icon && (
        <button className={cx("icon")}>
          <span className="material-symbols-rounded">delete</span>
        </button>
      )}
      <span className={cx("title-item")}>{title}</span>
    </div>
  );
}
export default DeleteMessage;
