import "./Global.scss";
import services from "../../services";
import { useDispatch, useSelector } from "react-redux";
import datauserSlide from "../../redux/slides/datauser";
import { useEffect } from "react";
import selector from "../../redux/selector";

function Global({ children }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let friends = await services.gettypefriends({
        userName: user.userName,
        type: "friends",
      });
      let requesFriends = await services.gettypefriends({
        userName: user.userName,
        type: "requesFriends",
      });
      let wanttobeFriends = await services.gettypefriends({
        userName: user.userName,
        type: "wanttobeFriends",
      });
      dispatch(datauserSlide.actions.setFriends(friends.data));
      dispatch(datauserSlide.actions.setRequestFriends(requesFriends.data));
      dispatch(datauserSlide.actions.setWanttobeFriends(wanttobeFriends.data));
    })();
  }, [user]);
  return <>{children}</>;
}
export default Global;
