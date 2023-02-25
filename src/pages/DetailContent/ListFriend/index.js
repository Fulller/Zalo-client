import classnames from "classnames/bind";
import layoutStyle from "../DetailContent.module.scss";
import style from "./ListFriend.module.scss";
import useText from "../../../hooks/useText";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import UserItem from "../../components/UserItem";
import settingSlide from "../../../redux/slides/setting";

const cxlayout = classnames.bind(layoutStyle);
const cx = classnames.bind(style);
function ListFriend() {
  let text = useText("navlist");
  let data = useSelector(selector.datauser.friends);

  return (
    <div className={cxlayout("layout1")}>
      <header>
        <span className="material-symbols-rounded">group</span>
        <h4>{text.listfriend}</h4>
      </header>
      <div className={cxlayout("main")}>
        <div className={cx("list-friend")}>
          {data.map((friend, index) => {
            return (
              <UserItem
                key={friend.userName}
                type="1"
                data={friend}
                clickToChat
                moreButton
              ></UserItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ListFriend;
