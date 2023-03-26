import classNames from "classnames/bind";
import style from "./DrapFile.module.scss";
import useText from "../../../../hooks/useText";

const cx = classNames.bind(style);
function DrapFile({ data: { getInputProps, isDragActive } }) {
  let text = useText("detailcontent");
  return (
    <div className={cx(["drap-file", !isDragActive && "hide"])}>
      <div className={cx("drap-box")}>
        <input {...getInputProps()}></input>
        <h1>{text.sendfast}</h1>
        <p>{text.dropithere}</p>
      </div>
    </div>
  );
}
export default DrapFile;
