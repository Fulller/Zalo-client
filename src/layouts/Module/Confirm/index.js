import style from "./Confirm.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import settingSlide from "../../../redux/slides/setting";
import datauserSlide from "../../../redux/slides/datauser";
import userSlide from "../../../redux/slides/user";
import useText from "../../../hooks/useText";
import services from "../../../services";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
function Confirm({ data }) {
  let dispatch = useDispatch();
  let text = useText("module");
  let navigate = useNavigate();
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
      text: {
        no: text.no,
        yes: text.remove,
      },
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
    logout: {
      title: text.confirm,
      content: <>{text.youwantlogout}</>,
      text: {
        no: text.no,
        yes: text.logout,
      },
      handle: async function () {
        dispatch(userSlide.actions.setDefault());
        dispatch(datauserSlide.actions.setDefault());
        dispatch(settingSlide.actions.setDefault());
        navigate("/login");
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
            {dataTypes[data.type].text.no}
          </button>
          <button className={cx("agree")} onClick={dataTypes[data.type].handle}>
            {dataTypes[data.type].text.yes}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Confirm;
