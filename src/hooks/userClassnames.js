import classNames from "classnames/bind";

function useClassnames(style) {
  let cx = classNames.bind(style);
  return cx;
}
