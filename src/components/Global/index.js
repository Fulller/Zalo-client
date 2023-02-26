import "./Global.scss";
import services from "../../services";
import { useDispatch, useSelector } from "react-redux";
import datauserSlide from "../../redux/slides/datauser";
import { useEffect, useState } from "react";
import selector from "../../redux/selector";
import io from "socket.io-client";
import url from "../../tools/url";
import mergeUserName from "../../tools/mergeUserName";
import useSocket from "../../hooks/useSocket";

const socket = io(url.socket);

function Global({ children }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  useSocket(socket);
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
      let conversations = {};
      for (let friend of friends.data) {
        let conversationId = mergeUserName(user.userName, friend.userName);
        let response = await services.getconversation({ conversationId });
        if (response.isSuccess) {
          conversations[conversationId] = response?.data;
        }
      }
      dispatch(datauserSlide.actions.setFriends(friends.data));
      dispatch(datauserSlide.actions.setRequestFriends(requesFriends.data));
      dispatch(datauserSlide.actions.setWanttobeFriends(wanttobeFriends.data));
      dispatch(datauserSlide.actions.setConversations(conversations));
    })();
  }, [user]);

  return <>{children}</>;
}
export { socket };
export default Global;
