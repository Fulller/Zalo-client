import style from "./InfoUser.module.scss";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import useText from "../../../hooks/useText";
import settingSlide from "../../../redux/slides/setting";
import Image from "../../../Images";
import Background from "../components/Background";

const cx = classNames.bind(style);
function InfoUser({ data }) {
  let user = useSelector(selector.user);
  let isOwner = user.userName == data?.userName;
  let text = useText("module");
  let dispatch = useDispatch();
  return (
    <div className={cx("infouser")}>
      <h3>{text.infoaccount}</h3>
      <div className={cx("top")}>
        <Background
          className={cx("background")}
          src={data.background}
        ></Background>
        <div className={cx("avatar")}>
          <Image className={cx("avatar-img")} src={data.avatar} id></Image>
        </div>
      </div>
      <div className={cx("content")}>
        <h4>{data.showName}</h4>
        <h5>{text.infopersonal}</h5>
        <div className={cx("info-personals")}>
          <div className={cx("info-personal")}>
            <span>Username</span>
            <p>{data.userName}</p>
          </div>
        </div>
        {isOwner && (
          <button
            className={cx("updateinfo")}
            onClick={() =>
              dispatch(
                settingSlide.actions.setModule({
                  isShow: true,
                  type: "updateuser",
                  data: user,
                })
              )
            }
          >
            <span className="material-symbols-rounded">border_color</span>
            <p>{text.updateinfo}</p>
          </button>
        )}
      </div>
    </div>
  );
}
export default InfoUser;
