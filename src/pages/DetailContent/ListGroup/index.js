import classnames from "classnames/bind";
import layoutStyle from "../DetailContent.module.scss";
import useText from "../../../hooks/useText";

let cxlayout = classnames.bind(layoutStyle);
function ListGroup() {
  let text = useText("navlist");
  return (
    <div className={cxlayout("layout1")}>
      <header>
        <span className="material-symbols-rounded">group_add</span>
        <h4>{text.listgroup}</h4>
      </header>
      <div className={cxlayout("main")}></div>
    </div>
  );
}
export default ListGroup;
