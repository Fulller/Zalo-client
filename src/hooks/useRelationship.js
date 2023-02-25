import { useSelector } from "react-redux";
import selector from "../redux/selector";
import { useState, useEffect } from "react";

function useRelationship(userNameFriend) {
  let friends = useSelector(selector.datauser.friends);
  let requestfriends = useSelector(selector.datauser.resquestfriends);
  let wanttobefriend = useSelector(selector.datauser.wanttobefriends);
  let [relationship, setRelationship] = useState("notfriend");
  useEffect(() => {
    if (
      friends.some((friend) => {
        return friend.userName == userNameFriend;
      })
    ) {
      setRelationship("friend");
    }
    if (
      requestfriends.some((friend) => {
        return friend.userName == userNameFriend;
      })
    ) {
      setRelationship("requested");
    }
    if (
      wanttobefriend.some((friend) => {
        return friend.userName == userNameFriend;
      })
    ) {
      setRelationship("wanttobe");
    }
  });
  return relationship;
}

export default useRelationship;
