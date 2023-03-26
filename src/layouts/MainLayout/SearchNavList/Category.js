import style from "./Category.module.scss";
import classNames from "classnames/bind";
import useText from "../../../hooks/useText";

const cx = classNames.bind(style);
function Category({ setCategory, currentCategory }) {
  let text = useText("navlist");
  const categorys = [
    {
      title: text.all,
      id: "all",
    },
    {
      title: text.conversation,
      id: "conversation",
    },
    {
      title: text.message,
      id: "message",
    },
  ];
  return (
    <div className={cx("category")}>
      {categorys.map((category) => {
        return (
          <button
            key={category.id}
            onClick={() => setCategory(category.id)}
            className={cx(currentCategory == category.id && "active")}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}
export default Category;
