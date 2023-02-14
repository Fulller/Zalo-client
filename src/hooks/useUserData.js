import { useSelector } from "react-redux";
import slector from "../redux/selector";

function useUserData() {
  let userData = useSelector(slector.user);
  return userData;
}
export default useUserData;
