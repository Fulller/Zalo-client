import text from "../text/index";
import { useSelector } from "react-redux";
import selector from "../redux/selector";
import { useEffect, useState } from "react";

function useText(page) {
  let language = useSelector(selector.language);
  let [Text, setText] = useState(text[language][page]);
  useEffect(() => {
    setText(text[language][page]);
  }, [language]);
  return Text;
}
export default useText;
