import style from "./Category.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function Category() {
  return <div className={cx("category")}></div>;
}
export default Category;
