import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import style from "./Mainlayout.module.scss";
import classNames from "classnames/bind";
import Module from "../Module";
import useAutoNavigate from "../../hooks/useAutoNavigate";
import DetailContent from "../../pages/DetailContent";

const cx = classNames.bind(style);
function MainLayout({ elements }) {
  let [NavList] = elements;
  useAutoNavigate();
  return (
    <div className={cx("mainlayout")}>
      <div className={cx("part1")}>
        <Navbar></Navbar>
      </div>
      <div className={cx("part2")}>
        <div className={cx("part3")}>
          <SearchBox></SearchBox>
        </div>
        <div className={cx("part4")}>
          <NavList></NavList>
        </div>
      </div>
      <div className={cx("part5")}>
        <DetailContent></DetailContent>
      </div>
      <Module></Module>
    </div>
  );
}
export default MainLayout;
