import { useEffect } from "react";
import url from "../tools/url";
import defaultimage from "./default.png";
import { useState } from "react";

function Image({ src = null, id = false, className, viewphotos = false }) {
  if (id && src) {
    src = url.server.getImage(src);
  }
  if (!src) {
    src = defaultimage;
  }

  return (
    <img
      className={className}
      src={src}
      onError={(e) => {
        e.target.src = defaultimage;
      }}
      onClick={() => {
        if (viewphotos) {
          viewphotos();
          window.open("/viewphotos", "_blank");
        }
      }}
    ></img>
  );
}
export default Image;
