import style from "./Navbar.module.scss";
import classNames from "classnames/bind";
import useNavData from "./useNavData";
import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import Tippy from "@tippyjs/react";
import HeadLess from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import useText from "../../../hooks/useText";
import { useHref } from "react-router-dom";
import { useState } from "react";
import UserPopper from "../../../components/Poppers/UserPopper";
import SettingPoper from "../../../components/Poppers/SettingPopper";

const cx = classNames.bind(style);
function Navbar() {
  let [visibleUserPopper, setVisibleUserPopper] = useState(false);
  let [visibleSettingPopper, setVisileSettingPopper] = useState(false);
  let data = useNavData();
  let href = useHref();
  let userData = useUserData();
  let text = useText("mainlayout");
  return (
    <div className={cx("navbar")}>
      <HeadLess
        visible={visibleUserPopper}
        placement="right-end"
        interactive={true}
        render={() => {
          return <UserPopper></UserPopper>;
        }}
        onClickOutside={() => setVisibleUserPopper(false)}
      >
        <Tippy
          delay={[500, 0]}
          content={<span>{userData?.showName}</span>}
          placement="left"
        >
          <img
            isuser
            className={cx("avatar")}
            src={userData?.avatar}
            onError={(e) =>
              (e.target.src =
                "https://images.assetsdelivery.com/compings_v2/koblizeek/koblizeek2001/koblizeek200100050.jpg")
            }
            onClick={() => setVisibleUserPopper(true)}
          ></img>
        </Tippy>
      </HeadLess>
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
          <HeadLess
            key={Math.random()}
            visible={visibleSettingPopper}
            placement="top-start"
            interactive={true}
            render={() => {
              return <SettingPoper></SettingPoper>;
            }}
            onClickOutside={() => setVisileSettingPopper(false)}
          >
            <Tippy
              delay={[500, 0]}
              content={<span>{text.setting}</span>}
              placement="left"
            >
              <div
                className={cx("navitem")}
                onClick={() => setVisileSettingPopper(true)}
              >
                <span className="material-symbols-outlined">settings</span>
              </div>
            </Tippy>
          </HeadLess>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
