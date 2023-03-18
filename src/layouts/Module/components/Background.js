import { useEffect } from "react";
import Image from "../../../Images";

const images = [
  "641585152a34e1602e5fe632",
  "6415852c2a34e1602e5fe634",
  "641585412a34e1602e5fe636",
  "6415854e2a34e1602e5fe638",
  "6415855a2a34e1602e5fe63a",
];
function Background({ src, className, id = true }) {
  if (!src) {
    src = images[Math.floor(Math.random() * images.length)];
  }
  return <Image className={className} src={src} id={id}></Image>;
}
export default Background;
