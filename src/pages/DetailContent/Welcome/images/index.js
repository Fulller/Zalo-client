import i0 from "../images/000.jpg";
import i1 from "../images/001.jpg";
import i2 from "../images/002.jpg";
import i3 from "../images/003.png";
import i4 from "../images/004.jpg";
import i5 from "../images/005.jpg";
import i6 from "../images/006.png";
import i7 from "../images/007.svg";
import i8 from "../images/008.png";
import useText from "../../../../hooks/useText";

function slide(thumb, title, description) {
  this.thumb = thumb;
  this.title = title;
  this.description = description;
}
function useDataWelcome() {
  let text = useText("welcome");
  return [i0, i1, i2, i3, i4, i5, i6, i7, i8].map((thumb, index) => {
    return new slide(
      thumb,
      text[`slide${index}`].title,
      text[`slide${index}`].description
    );
  });
}
export default useDataWelcome;
