import { useEffect } from "react";
import { useSelector } from "react-redux";
import selector from "../../../../redux/selector";

function Friend() {
  let { data } = useSelector(selector.detailcontent);
  console.log(data);
  return <div>{data.showName}</div>;
}
export default Friend;
