import { useHref, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import selector from "../redux/selector";
import { useEffect } from "react";

function useAutoNavigate() {
  let href = useHref();
  let user = useSelector(selector.user);
  let navigate = useNavigate();
  useEffect(() => {
    if (href.includes("login")) {
      if (user) {
        navigate("/message");
      }
    } else {
      if (user == null) {
        navigate("/login");
      }
    }
  }, [user]);
  return null;
}
export default useAutoNavigate;
