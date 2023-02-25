import style from "./Confirm.module.scss";
import classNames from "classnames/bind";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch } from "react-redux";
import datauserSlide from "../../../redux/slides/datauser";
import useText from "../../../hooks/useText";
import services from "../../../services";

const cx = classNames.bind(style);
function Confirm({ data }) {
  let dispatch = useDispatch();
  let text = useText("module");
  const dataTypes = {
    unfriend: {
      title: text.confirm,
      content: (
        <>
          {text.remove}{" "}
          <span className={cx("userNameFriend")}>{data?.friend?.showName}</span>{" "}
          {text.outlistfriend}
        </>
      ),
      handle: async function () {
        let response = await services.unfriend({
          userName: data.user.userName,
          userNameFriend: data.friend.userName,
        });
        console.log(response);
        if (response.isSuccess) {
          dispatch(
            datauserSlide.actions.unfriend({ userName: data.friend.userName })
          );
        }
        closeModule();
      },
    },
  };
  function closeModule() {
    dispatch(
      settingSlide.actions.setModule({
        isShow: false,
      })
    );
  }
  return (
    <div className={cx("confirm")}>
      <h3>{dataTypes[data.type].title}</h3>
      <div className={cx("content")}>
        <p>{dataTypes[data.type].content}</p>
        <div className={cx("buttons")}>
          <button className={cx("disagree")} onClick={closeModule}>
            {text.no}
          </button>
          <button className={cx("agree")} onClick={dataTypes[data.type].handle}>
            {text.remove}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Confirm;
