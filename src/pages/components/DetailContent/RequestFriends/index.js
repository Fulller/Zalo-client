import services from "../../../../services";
import { useEffect, useState } from "react";
import UserItemRequest from "../../UserItemRequest";
import { useSelector } from "react-redux";
import selector from "../../../../redux/selector";

function RequestFriends() {
  let [data, setData] = useState(null);
  let user = useSelector(selector.user);
  useEffect(() => {
    (async function () {
      let response = await services.gettypefriends({
        userName: user.userName,
        type: "requesFriends",
      });
      setData(response.data);
    })();
  }, []);
  return (
    <div>
      {data &&
        data.map((user) => {
          return (
            <UserItemRequest key={user.userName} data={user}></UserItemRequest>
          );
        })}
    </div>
  );
}

export default RequestFriends;
