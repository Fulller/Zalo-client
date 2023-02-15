import { useSelector } from "react-redux";
import { useEffect } from "react";
import slector from "../../../redux/selector";
import Friend from "./Friend";
import RequestFriends from "./RequestFriends";

function DetailContent() {
  let { type } = useSelector(slector.detailcontent);
  return (
    <div>
      {type == "friend" && <Friend></Friend>}
      {type == "requesFriends" && <RequestFriends></RequestFriends>}
    </div>
  );
}
export default DetailContent;
