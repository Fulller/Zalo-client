import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../redux/selector";
import { useEffect, useState } from "react";
import userSlide from "../../redux/slides/user";
import settingSlide from "../../redux/slides/setting";
import services from "../../services";
import Image from "../../Images";
import url from "../../tools/url";

function Test() {
  return (
    <div>
      <img src={url.server.getImage("640ef2cd9228abd967bc7a8c")}></img>
    </div>
  );
}
export default Test;
