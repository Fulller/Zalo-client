import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlide from "../redux/slides/user";
import selector from "../redux/selector";

const images = [
  "641585152a34e1602e5fe632",
  "6415852c2a34e1602e5fe634",
  "641585412a34e1602e5fe636",
  "6415854e2a34e1602e5fe638",
  "6415855a2a34e1602e5fe63a",
];
function useRandomBackground() {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  useEffect(() => {
    if (!user.background) {
      let index = Math.floor(Math.random() * images.length);
      dispatch(userSlide.actions.setRandomBackground(images[index]));
    }
  }, [user.userName]);
  return user.background;
}
export default useRandomBackground;
