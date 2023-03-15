import { useDispatch } from "react-redux";
import settingSlide from "../../../redux/slides/setting";

function Avatar({ children, data = null }) {
  let dispatch = useDispatch();
  function handleOpenModuleInfoUser() {
    if (data) {
      dispatch(
        settingSlide.actions.setModule({
          isShow: true,
          data: data,
          type: "infouser",
        })
      );
    }
  }
  return <div onClick={handleOpenModuleInfoUser}>{children}</div>;
}
export default Avatar;
