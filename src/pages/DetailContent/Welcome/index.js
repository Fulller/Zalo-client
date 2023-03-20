import style from "./Welcome.module.scss";
import classNames from "classnames/bind";
import useDataWelcome from "./images";
import useText from "../../../hooks/useText";
import Image from "../../../Images";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);
function Welcome() {
  let text = useText("welcome");
  let dataWelcome = useDataWelcome();
  let [currentSlide, setCurrentSlide] = useState(0);
  function handleChangeSlide(type) {
    switch (type) {
      case "prev": {
        setCurrentSlide(
          (currentSlide + dataWelcome.length - 1) % dataWelcome.length
        );
        break;
      }
      case "next": {
        setCurrentSlide((currentSlide + 1) % dataWelcome.length);
        break;
      }
    }
  }
  useEffect(() => {
    let changeSlideInterval = setInterval(() => {
      handleChangeSlide("next");
    }, 5000);
    document
      .getElementById("slide" + currentSlide)
      .scrollIntoView({ behavior: "smooth" });
    return function () {
      clearInterval(changeSlideInterval);
    };
  }, [currentSlide]);
  return (
    <div className={cx("welcome")}>
      <div className={cx("header")}>
        <h1>
          {text.title} <b>Zalo Web!</b>
        </h1>
        <p>{text.description}</p>
      </div>
      <div className={cx("wrapper-sides")}>
        <div className={cx("slides")}>
          <button
            className={cx("slide-button-prev")}
            onClick={() => handleChangeSlide("prev")}
          >
            <span className="material-symbols-rounded">arrow_back_ios</span>
          </button>
          {dataWelcome.map((slide, index) => {
            return (
              <div
                className={cx("slide")}
                key={slide.title}
                id={"slide" + index}
              >
                <Image src={slide.thumb}></Image>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            );
          })}
          <div className={cx("index")}>
            {dataWelcome.map((slide, index) => {
              return (
                <span
                  className={cx([
                    "index-point",
                    currentSlide == index && "active",
                  ])}
                  key={index}
                ></span>
              );
            })}
          </div>
          <button
            className={cx("slide-button-next")}
            onClick={() => handleChangeSlide("next")}
          >
            <span class="material-symbols-rounded">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
