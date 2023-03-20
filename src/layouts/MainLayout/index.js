import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import style from "./Mainlayout.module.scss";
import classNames from "classnames/bind";
import Module from "../Module";
import useAutoNavigate from "../../hooks/useAutoNavigate";
import DetailContent from "../../pages/DetailContent";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import SearchNavList from "./SearchNavList";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(style);
function MainLayout({ elements }) {
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  let detailcontent = useSelector(selector.detailcontent);
  let [NavList] = elements;
  let user = useSelector(selector.user);
  useAutoNavigate();
  let isshownavlist = useSelector(selector.isshownavlist);
  return (
    <>
      {user && (
        <div className={cx("mainlayout")}>
          <div className={cx("part1")}>
            <Navbar></Navbar>
          </div>
          {(isshownavlist || !isMobile) && (
            <div className={cx(["part2", isMobile && "part2-mobile"])}>
              <div className={cx("part3")}>
                <SearchBox></SearchBox>
              </div>
              <div className={cx("part4")}>
                <NavList></NavList>
              </div>
            </div>
          )}
          {(!isMobile || (isMobile && !isshownavlist)) && (
            <div className={cx("part5")}>
              <DetailContent></DetailContent>
            </div>
          )}
          <Module></Module>
        </div>
      )}
    </>
  );
}
export default MainLayout;
