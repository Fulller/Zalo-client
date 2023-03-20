import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import Image from "../../Images";
import { useEffect, useState } from "react";
import classnamed from "classnames/bind";
import style from "./ViewPhotos.module.scss";
import url from "../../tools/url";
import { saveAs } from "file-saver";

const cx = classnamed.bind(style);
function ViewPhotos() {
  let { title, index, photos } = useSelector(selector.viewphotos);
  let [isFirstTime, setIsFirstTime] = useState(true);
  let [indexPhoto, setIndexPhoto] = useState(index);
  let [scale, setScale] = useState(1);
  let [transformOrigin, setTransformOrigin] = useState({
    x: "center",
    y: "center",
  });
  let [degPhoto, setDegPhoto] = useState(0);
  useEffect(() => {
    document.title = title;
  }, []);
  useEffect(() => {
    setScale(1);
    setTransformOrigin({ x: "center", y: "center" });
    setDegPhoto(0);
    if (isFirstTime) {
      setTimeout(() => {
        document
          .getElementById(photos[indexPhoto])
          .scrollIntoView({ behavior: "smooth" });
      }, 1000);
      setIsFirstTime(false);
    } else {
      document
        .getElementById(photos[indexPhoto])
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [indexPhoto]);
  useEffect(() => {
    let imagedom = document.querySelector(cx(".main-photo"));
    imagedom.style.transform = `scale(${scale}) rotate(${degPhoto}deg)`;
    if (typeof transformOrigin.x == "number") {
      imagedom.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
    } else {
      imagedom.style.transformOrigin = "center center";
    }
  }, [scale, transformOrigin, degPhoto]);
  function zoomimage(event) {
    let newScale = scale - event.deltaY * 0.001;
    if (newScale <= 4 && newScale >= 1) {
      setScale(newScale);
    }
  }
  function changeTransformOrigin(event) {
    setTransformOrigin({
      x: event.screenX,
      y: event.screenY,
    });
  }
  function donwloadPhoto() {
    saveAs(
      url.server.getImage(photos[indexPhoto]),
      photos[indexPhoto] + ".jpg"
    );
  }
  function rotatePhoto(type) {
    switch (type) {
      case "left":
        setDegPhoto(degPhoto - 90);
        break;
      case "right":
        setDegPhoto(degPhoto + 90);
        break;
    }
  }
  function zoominout(type) {
    let newScale = Math.floor(scale);
    switch (type) {
      case "in":
        newScale += 1;
        break;
      case "out":
        newScale -= 1;
        break;
    }
    if (newScale <= 4 && newScale >= 1) {
      setScale(newScale);
    }
  }
  function resetImage() {
    setScale(1);
    setDegPhoto(1);
  }
  return (
    <div className={cx("view-photos")}>
      <div className={cx("main")}>
        <div className={cx("photo")} onWheel={zoomimage}>
          <img
            onMouseMove={changeTransformOrigin}
            onMouseLeave={(e) => {
              setTransformOrigin({
                x: "center",
                y: "center",
              });
            }}
            className={cx(["image", "main-photo"])}
            src={url.server.getImage(photos[indexPhoto])}
          />
        </div>
        <div className={cx("photos")}>
          {photos.map((imageid, index) => {
            return (
              <div
                className={cx([
                  "wrapper-image",
                  indexPhoto == index && "current-photo",
                ])}
                key={imageid}
                id={imageid}
                onClick={() => setIndexPhoto(index)}
              >
                <Image className={cx("image")} src={imageid} id></Image>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("footer")}>
        <div className={cx("buttons")}>
          <button onClick={donwloadPhoto}>
            <span className="material-symbols-outlined">download</span>
          </button>
          <button onClick={() => rotatePhoto("left")}>
            <span className="material-symbols-outlined">rotate_left</span>
          </button>
          <button onClick={() => rotatePhoto("right")}>
            <span className="material-symbols-outlined">rotate_right</span>
          </button>
          <button onClick={() => zoominout("in")}>
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button onClick={() => zoominout("out")}>
            <span className="material-symbols-outlined">zoom_out</span>
          </button>
          <button onClick={resetImage}>
            <span className="material-symbols-outlined">reset_image</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ViewPhotos;
