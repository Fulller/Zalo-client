import classnames from "classnames/bind";
import style from "./NoPage.module.scss";
import { Link } from "react-router-dom";
import Images from "../../Images/link";
import useText from "../../hooks/useText";

let cx = classnames.bind(style);
function NoPage() {
  let text = useText("nopage");
  return (
    <div className={cx("wrapper")}>
      <Link className={cx("backhome")} to="/message">
        <img src={Images.nopage}></img>
      </Link>
    </div>
  );
}
export default NoPage;
