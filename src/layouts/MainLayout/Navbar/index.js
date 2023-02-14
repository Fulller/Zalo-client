import style from "./Navbar.module.scss";
import classNames from "classnames/bind";
import useNavData from "./useNavData";
import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useText from "../../../hooks/useText";
import { useHref } from "react-router-dom";

const cx = classNames.bind(style);
function Navbar() {
  let data = useNavData();
  let href = useHref();
  let userData = useUserData();
  let text = useText("mainlayout");
  return (
    <div className={cx("navbar")}>
      <Tippy content={<span>{userData?.showName}</span>} placement="left">
        <img className={cx("avatar")} src={userData?.avatar}></img>
      </Tippy>
      <div className={cx("wrappernav")}>
        <div className={cx(["nav-part", "nav-top"])}>
          {data.top.map((navitemdata) => {
            return (
              <Tippy
                delay={[500, 0]}
                key={Math.random()}
                content={<span>{navitemdata.hovertext}</span>}
                placement="left"
              >
                <Link
                  className={cx([
                    "navitem",
                    href.includes(navitemdata.link) && "active",
                  ])}
                  to={navitemdata.link}
                  key={Math.random()}
                >
                  {navitemdata.icon}
                </Link>
              </Tippy>
            );
          })}
        </div>
        <div className={cx(["nav-part", "nav-bottom"])}>
          {data.bottom.map((navitemdata) => {
            return (
              <Tippy
                delay={[500, 0]}
                key={Math.random()}
                content={<span>{navitemdata.hovertext}</span>}
                placement="left"
              >
                <Link
                  className={cx("navitem")}
                  to={navitemdata.link}
                  key={Math.random()}
                >
                  {navitemdata.icon}
                </Link>
              </Tippy>
            );
          })}
          <Tippy
            delay={[500, 0]}
            key={Math.random()}
            content={<span>{text.setting}</span>}
            placement="left"
          >
            <div className={cx("navitem")}>
              <span className="material-symbols-outlined">settings</span>
            </div>
          </Tippy>
        </div>
      </div>
      <div className={cx("nav-bottom")}></div>
    </div>
  );
}
export default Navbar;
