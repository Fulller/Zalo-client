import io from "socket.io-client";
import url from "../tools/url";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import selector from "../redux/selector";
import services from "../services";
import datauserSlide from "../redux/slides/datauser";

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
        await services.updatamessageshistory({
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
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);
  return 1;
}
export default useSocket;
