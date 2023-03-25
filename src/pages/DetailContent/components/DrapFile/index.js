import classNames from "classnames/bind";
import style from "./DrapFile.module.scss";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const cx = classNames.bind(style);
function DrapFile({ data: { getInputProps, isDragActive } }) {
  console.log(isDragActive);
  return (
    <div className={cx(["drap-file", !isDragActive && "hide"])}>
      <div className={cx("drap-box")}>
        <input {...getInputProps()}></input>
        <h1>Gửi nhanh</h1>
        <p>Thả ảnh vào đây để gửi ngay</p>
      </div>
    </div>
  );
}
export default DrapFile;
