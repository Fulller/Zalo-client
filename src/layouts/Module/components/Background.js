import { useEffect } from "react";
import Image from "../../../Images";
import { useCallback, memo } from "react";

const images = [
  "641585152a34e1602e5fe632",
  "6415852c2a34e1602e5fe634",
  "641585412a34e1602e5fe636",
  "6415854e2a34e1602e5fe638",
  "6415855a2a34e1602e5fe63a",
];
let randomsrc = images[Math.floor(Math.random() * images.length)];
function Background({ src, className, id = true }) {
  if (!src) {
    src = randomsrc;
  }
  return <Image className={className} src={src} id={id}></Image>;
}
export default Background;
