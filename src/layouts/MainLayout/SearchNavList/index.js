import style from "./SearchNavList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function SearchNavList({ data }) {
  return <div className={cx(["search-nav-list"])}>Search Navlist</div>;
}
export default SearchNavList;
