import io from "socket.io-client";
import url from "../tools/url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import selector from "../redux/selector";

function useSocket() {
  let [socket, setSocket] = useState(io(url.socket));
  let user = useSelector(selector.user);
  useEffect(() => {
    setSocket(io(url.socket));
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("This Client connect with socket");
    });
    socket.emit("joinrooms", user?.roomIds);
    return function () {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [user]);
  return socket;
}
export default useSocket;
