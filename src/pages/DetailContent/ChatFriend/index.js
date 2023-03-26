import layoutStyle from "../DetailContent.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import selector from "../../../redux/selector";
import useText from "../../../hooks/useText";
import { useState } from "react";

import Header from "../components/Header";
import InputText from "../components/InputText";
import Messages from "../components/Messages";
import InfoConversation from "../components/InfoConversation";
import Image from "../../../Images";
import DrapFile from "../components/DrapFile";
import { useDropzone } from "react-dropzone";
import services from "../../../services";
import mergeUserName from "../../../tools/mergeUserName";
import { socket } from "../../../components/Global";

const cxlayout = classNames.bind(layoutStyle);
function ChatFriend({ data }) {
  let showinfocontent = useSelector(selector.showinfocontent);
  let text = useText("detailcontent");
  async function sendImage(file) {
    let response = await services.uploadImage(file);
    if (response.isSuccess) {
      let image = response.data;
      let conversationId = mergeUserName(
        data.data.user.userName,
        data.data.friend.userName
      );
      let responseMessage = await services.sendmessageV2({
        conversationId: conversationId,
        content: image,
        sender: data.data.user.userName,
        type: "image",
      });
      if (responseMessage.isSuccess) {
        socket.emit("sendMessageToFriend", {
          senderId: data.data.user.userName,
          receiveId: data.data.friend.userName,
          conversationId,
        });
      }
    }
  }
  let { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/gif": [".gif"],
    },
    onDrop: async (acceptedFiles) => {
      sendImage(acceptedFiles[0]);
    },
  });
  return (
    <div className={cxlayout("layout2")}>
      <div className={cxlayout("left")}>
        <div className={cxlayout("header")}>
          <Header data={data}></Header>
        </div>
        <div
          className={cxlayout("messages")}
          style={{ position: "relative" }}
          {...getRootProps()}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Image
            className={cxlayout("background")}
            src={data?.data?.friend?.avatar}
            id
          ></Image>
          <Messages data={data} friend={data?.data?.friend}></Messages>
          <DrapFile data={{ getInputProps, isDragActive }}></DrapFile>
        </div>
        <div className={cxlayout("input")}>
          <InputText data={data}></InputText>
        </div>
      </div>
      <div
        className={cxlayout(["right", !showinfocontent && "hideInfoContent"])}
      >
        <div className={cxlayout("title")}>{text.infoconversation}</div>
        <InfoConversation data={data}></InfoConversation>
      </div>
    </div>
  );
}
export default ChatFriend;
