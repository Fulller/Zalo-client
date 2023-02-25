import style from "./Addfriend.module.scss";
import classNames from "classnames/bind";
import services from "../../../services";
import { useEffect, useState } from "react";
import UserItem from "../../../pages/components/UserItem";
import text from "../../../text";
import useText from "../../../hooks/useText";
import useRelationship from "../../../hooks/useRelationship";
import datauserSlide from "../../../redux/slides/datauser";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";

const cx = classNames.bind(style);
function Addfriend() {
  let text = useText("module");
  let dispatch = useDispatch();
  let [result, setResult] = useState(null);
  let [userName, setUserName] = useState("");
  let relationship = useRelationship(result?.userName);
  let user = useSelector(selector.user);
  useEffect(() => {
    const delayDebounceSearch = setTimeout(async () => {
      let response;
      if (user.userName != userName.trim()) {
        response = await services.findfriend({
          userNameFriend: userName.trim(),
        });
      }
      if (response?.isSuccess) {
        setResult(response.data);
      } else {
        setResult(null);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceSearch);
  }, [userName]);

  return (
    <div className={cx("addfriend")}>
      <h3>Thêm bạn</h3>
      <div className={cx("content")}>
        <input
          value={userName}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          spellCheck="false"
        />
        <div className={cx("result")}>
          {result ? (
            <UserItem type="2" data={result} hasButton></UserItem>
          ) : (
            <h4>{text.cantfinduser}</h4>
          )}
        </div>
      </div>
    </div>
  );
}
export default Addfriend;
