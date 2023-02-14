import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../redux/selector";
import { useEffect } from "react";
import userSlide from "../../redux/slides/user";
import settingSlide from "../../redux/slides/setting";

function Test() {
  let param = useParams();
  console.log(param);
  return (
    <div>
      <h1>{param.ok}</h1>
    </div>
  );
}
export default Test;
