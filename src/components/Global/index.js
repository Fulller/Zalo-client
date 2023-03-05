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
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";
import en from "javascript-time-ago/locale/en";

const socket = io(url.socket);
let timeAgo;
function Global({ children }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  let language = useSelector(selector.language);
  useSocket(socket);
  useEffect(() => {
    if (language == "vi") {
      TimeAgo.addDefaultLocale(vi);
    } else {
      TimeAgo.addDefaultLocale(en);
    }
    timeAgo = new TimeAgo("en-US");
  }, []);
  useEffect(() => {
    (async () => {
      let friends = await services.gettypefriends({
        userName: user.userName,
        type: "friends",
      });
      let friendsMap = {};
      friendsMap[user.userName] = user;
      for (let friend of friends.data) {
        friendsMap[friend.userName] = friend;
      }
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
      let messageshistory =
        (await services.getoptional({
          userName: user.userName,
          optional: "messagesHistory",
        })) || [];
      dispatch(datauserSlide.actions.setFriends(friends.data));
      dispatch(datauserSlide.actions.setFriendsMap(friendsMap));
      dispatch(datauserSlide.actions.setRequestFriends(requesFriends.data));
      dispatch(datauserSlide.actions.setWanttobeFriends(wanttobeFriends.data));
      dispatch(datauserSlide.actions.setConversations(conversations));
      dispatch(datauserSlide.actions.setMessagesHistory(messageshistory.data));
    })();
  }, [user]);

  return <>{children}</>;
}
export { socket, timeAgo };
export default Global;
