import { useEffect } from "react";
import useText from "../../../hooks/useText";

let navitem = class {
  constructor(icon, link, hovertext, handle) {
    this.icon = icon;
    this.link = link;
    this.hovertext = hovertext;
    this.handle = handle;
  }
};
function useNavData() {
  let text = useText("mainlayout");
  let data = {
    top: [
      new navitem(
        <span className="material-symbols-rounded">chat</span>,
        "/message",
        text.message
      ),
      new navitem(
        <span className="material-symbols-rounded">contacts</span>,
        "/phonebook",
        text.phonebook
      ),
      new navitem(
        <span className="material-symbols-rounded">check_box</span>,
        "/todos",
        text.todo
      ),
      // new navitem(
      //   <span className="material-symbols-rounded">videocam</span>,
      //   "/zavi",
      //   text.zavi
      // ),
    ],
    bottom: [
      new navitem(
        <span className="material-symbols-rounded">cloud</span>,
        "/message",
        text.mycloude
      ),
      // new navitem(
      //   <span className="material-symbols-rounded">dashboard</span>,
      //   "/message",
      //   text.screencapture
      // ),
      new navitem(
        <span className="material-symbols-rounded">business_center</span>,
        "/message",
        text.tool
      ),
    ],
  };
  return data;
}
export default useNavData;
