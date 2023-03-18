import { useEffect } from "react";
import url from "../tools/url";

function Image({ src = null, id = false, className }) {
  if (id && src) {
    src = url.server.getImage(src);
  }
  if (!src) {
    src = "https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg";
  }
  return (
    <img
      className={className}
      src={src}
      onError={(e) => {
        e.target.src =
          "https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg";
      }}
    ></img>
  );
}
export default Image;
