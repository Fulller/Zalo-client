import classNames from "classnames/bind";
import style from "./Test.module.scss";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const cx = classNames.bind(style);
function Test() {
  let [file, setFile] = useState(null);
  let { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let newFile = acceptedFiles[0];
      newFile.preview = URL.createObjectURL(newFile);
      setFile(newFile);
    },
  });
  console.log(file);
  return (
    <div className={cx("wrapper")} {...getRootProps()}>
      <input {...getInputProps()}></input>
      {file && <img src={file.preview}></img>}
    </div>
  );
}

export default Test;
