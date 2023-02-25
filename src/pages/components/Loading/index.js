import style from "./Loading.module.scss";
import classname from "classnames/bind";

const cx = classname.bind(style);
function Loading() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("loading")}></div>
    </div>
  );
}
export default Loading;
