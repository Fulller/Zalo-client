import { useEffect, useState } from "react";
import services from "../../../services";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import UserItem from "../UserItem";
import style from "./PhonebookNav.module.scss";
import classNames from "classnames/bind";
import ButtonDetailType from "../ButtonDetailType";
import { useDispatch } from "react-redux";
import settingSlide from "../../../redux/slides/setting";
import Image from "../../../Images/link";
import useText from "../../../hooks/useText";

const cx = classNames.bind(style);
function PhoneBookNav() {
  let text = useText("navlist");
  let dispatch = useDispatch();
  let [data, setData] = useState("");
  let user = useSelector(selector.user);
  useEffect(() => {
    (async function () {
      let res = await services.gettypefriends({
        userName: user.userName,
        type: "friends",
      });
      setData(res.data);
    })();
  }, [user]);
  return (
    <div className={cx("wrapper")}>
      <ButtonDetailType
        data={{
          avatar: Image.addfriendlogo,
          showName: text.requestfriends,
        }}
        handleClick={function () {
          dispatch(
            settingSlide.actions.detailcontent({
              detailcontent: { type: "requesFriends", data: {} },
            })
          );
        }}
      ></ButtonDetailType>
      <div className={cx("line")}></div>
      {data &&
        data.map((user) => {
          let handleClick = function () {
            dispatch(
              settingSlide.actions.detailcontent({
                detailcontent: { type: "friend", data: user },
              })
            );
          };
          return (
            <UserItem
              key={user.userName}
              data={user}
              handleClick={handleClick}
            ></UserItem>
          );
        })}
    </div>
  );
}
export default PhoneBookNav;
