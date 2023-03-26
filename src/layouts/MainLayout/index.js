import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import style from "./Mainlayout.module.scss";
import classNames from "classnames/bind";
import Module from "../Module";
import Notification from "../Notification";
import useAutoNavigate from "../../hooks/useAutoNavigate";
import DetailContent from "../../pages/DetailContent";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import { useMediaQuery } from "react-responsive";
import SearchNavList from "./SearchNavList";
import Category from "./SearchNavList/Category";
import { useState } from "react";

const cx = classNames.bind(style);
function MainLayout({ elements }) {
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  let user = useSelector(selector.user);
  let detailcontent = useSelector(selector.detailcontent);
  let [NavList] = elements;
  let [category, setCategory] = useState("all");
  let isshownavlist = useSelector(selector.isshownavlist);
  let searchnavlist = useSelector(selector.searchnavlist);
  useAutoNavigate();
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
                {searchnavlist.isShow && (
                  <Category setCategory={setCategory}></Category>
                )}
                {searchnavlist.isShow ? (
                  <SearchNavList
                    data={searchnavlist.data}
                    category={category}
                  ></SearchNavList>
                ) : (
                  <NavList></NavList>
                )}
              </div>
            </div>
          )}
          {(!isMobile || (isMobile && !isshownavlist)) && (
            <div className={cx("part5")}>
              <DetailContent></DetailContent>
            </div>
          )}
          <Module></Module>
          <Notification></Notification>
        </div>
      )}
    </>
  );
}
export default MainLayout;
