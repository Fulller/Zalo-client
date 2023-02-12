import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../redux/selector";
import { useEffect } from "react";
import userSlide from "../../redux/slides/user";
import settingSlide from "../../redux/slides/setting";

function Test() {
  let dispatch = useDispatch();
  let user = useSelector(selector.user);
  let setting = useSelector(selector.getSetting);
  console.log(setting);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(settingSlide.actions.changePage("Login"));
        }}
      >
        dispatch
      </button>
    </div>
  );
}
export default Test;
