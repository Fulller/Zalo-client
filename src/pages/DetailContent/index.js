import ListFriend from "./ListFriend";
import ListGroup from "./ListGroup";
import RequestFriend from "./RequestFriend";
import ChatFriend from "./ChatFriend";
import Welcome from "./Welcome";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

function DetailContent() {
  let detailContentData = useSelector(selector.detailcontent);
  function MainDetailContent() {
    switch (detailContentData.type) {
      case "list-friend":
        return <ListFriend></ListFriend>;
      case "list-group":
        return <ListGroup></ListGroup>;
      case "request-friend":
        return <RequestFriend></RequestFriend>;
      case "chat-friend":
        return <ChatFriend data={detailContentData}></ChatFriend>;
      default:
        return <Welcome></Welcome>;
    }
  }
  return (
    <div style={{ height: "100%" }}>
      <MainDetailContent></MainDetailContent>
    </div>
  );
}
export default DetailContent;
