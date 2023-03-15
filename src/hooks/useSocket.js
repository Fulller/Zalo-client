import io from "socket.io-client";
import url from "../tools/url";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import selector from "../redux/selector";
import services from "../services";
import datauserSlide from "../redux/slides/datauser";
import mergeUserName from "../tools/mergeUserName";

function useSocket(socket) {
  let dispatch = useDispatch();
  let user = useSelector(selector.user);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("joinrooms", user.roomIds);
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("receiveMessageFromFriend", async (data) => {
      let response = await services.getconversation({
        conversationId: data.conversationId,
      });
      if (response.isSuccess) {
        let resupdate = await services.updatamessageshistory({
          userName: user.userName,
          conversationId: data.conversationId,
        });
        dispatch(
          datauserSlide.actions.updateMessagesHistory(data.conversationId)
        );
        dispatch(
          datauserSlide.actions.setConversation({
            conversationId: data.conversationId,
            conversation: response.data,
          })
        );
      }
    });
    socket.on("requestfriend", async () => {
      let requesFriends = await services.gettypefriends({
        userName: user.userName,
        type: "requesFriends",
      });
      console.log({ requesFriends });
      dispatch(datauserSlide.actions.setRequestFriends(requesFriends.data));
    });
    socket.on("acceptedrequestfriend", async () => {
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
      let conversations = {};
      for (let friend of friends.data) {
        let conversationId = mergeUserName(user.userName, friend.userName);
        let response = await services.getconversation({ conversationId });
        if (response.isSuccess) {
          conversations[conversationId] = response?.data;
        }
      }
      dispatch(datauserSlide.actions.setFriends(friends.data));
      dispatch(datauserSlide.actions.setFriendsMap(friendsMap));
      dispatch(datauserSlide.actions.setRequestFriends(requesFriends.data));
      dispatch(datauserSlide.actions.setConversations(conversations));
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);
  return true;
}
export default useSocket;
