import style from "../Poppers.module.scss";
import classNames from "classnames/bind";
import { Info, Logout, Setting, Language } from "../components";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import useText from "../../../hooks/useText";

const cx = classNames.bind(style);
function SettingPoper({ setVisible }) {
  let text = useText("popper");
  return (
    <div className={cx("popper")} style={{ minWidth: "200px" }}>
      <Info
        cx={cx}
        title={text.infoaccount}
        icon={<span className="material-symbols-rounded">person</span>}
        setVisible={setVisible}
      ></Info>
      <Setting
        cx={cx}
        title={text.setting}
        icon={<span className="material-symbols-rounded">settings</span>}
        setVisible={setVisible}
      ></Setting>
      <div className={cx("line")}></div>
      <Language
        cx={cx}
        title={text.language}
        icon={<span className="material-symbols-rounded">language</span>}
        setVisible={setVisible}
      ></Language>
      <div className={cx("line")}></div>
      <Logout
        cx={cx}
        title={text.logout}
        icon={<span className="material-symbols-rounded">logout</span>}
        setVisible={setVisible}
      ></Logout>
    </div>
  );
}
export default SettingPoper;
