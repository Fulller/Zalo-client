import style from "./Phonebook.module.scss";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import settingSlide from "../../../redux/slides/setting";
import { useDispatch } from "react-redux";
import useText from "../../../hooks/useText";
import { useMediaQuery } from "react-responsive";

let cx = classnames.bind(style);

function Phonebook() {
  let text = useText("navlist");
  let isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const listFeature = [
    {
      id: "list-friend",
      title: text.listfriend,
      icon: "group",
    },
    // {
    //   id: "list-group",
    //   title: text.listgroup,
    //   icon: "group_add",
    // },
    {
      id: "request-friend",
      title: text.requestfriend,
      icon: "mail",
    },
  ];
  let [feature, setFeature] = useState(listFeature[0].id);
  let dispatch = useDispatch();
  function handleClickFeature(featureId) {
    setFeature(featureId);
    dispatch(settingSlide.actions.detailcontent({ type: featureId }));
  }
  useEffect(() => {
    dispatch(settingSlide.actions.detailcontent({ type: listFeature[0].id }));
  }, []);
  return (
    <div className={cx("wrapper")}>
      {listFeature.map((featureItem) => {
        return (
          <div
            className={cx([
              "feature-item",
              feature == featureItem.id && "active",
            ])}
            key={featureItem.id}
            onClick={() => {
              handleClickFeature(featureItem.id);
              if (isMobile) {
                dispatch(settingSlide.actions.setIsshownavlist(false));
              }
            }}
          >
            <span className="material-symbols-rounded">{featureItem.icon}</span>
            <h4>{featureItem.title}</h4>
          </div>
        );
      })}
    </div>
  );
}
export default Phonebook;
