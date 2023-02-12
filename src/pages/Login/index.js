import style from "./Login.module.scss";
import classnames from "classnames/bind";
import imageLink from "../../Images/link";
import { useState, useRef, useEffect } from "react";
import useText from "../../hooks/useText";
import services from "../../services";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(style);
const eyeicon = {
  on: "visibility",
  off: " visibility_off",
};
function Login() {
  const text = useText("login");
  const navigate = useNavigate();
  let passwordRef = useRef();
  let [eyeStatus, setEyeStatus] = useState("on");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loginBtnIsCanClick, setLoginBtnIsCanClick] = useState(false);
  useEffect(() => {
    if (username.length > 6 && password.length >= 6) {
      setLoginBtnIsCanClick(true);
    } else {
      setLoginBtnIsCanClick(false);
    }
  }, [username, password]);
  function handleChangeEyeStatus() {
    setEyeStatus(eyeStatus == "on" ? "off" : "on");
    passwordRef.current.focus();
  }
  function setData(e, setFunction) {
    setFunction(e.target.value);
  }
  async function handleLoginBtnClick() {
    if (loginBtnIsCanClick) {
      let data = await services.login({
        userName: username,
        password: password,
      });
      console.log(data);
      if (data.isSuccess) {
        navigate("/home");
      }
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <img src={imageLink.logoZalo}></img>
          <h4>{text.title}</h4>
        </div>
        <div className={cx("form")}>
          <div className={cx("form-input-group")}>
            <span className="material-symbols-outlined">phone_iphone</span>
            <input
              type="text"
              placeholder={text.username}
              value={username}
              onChange={(e) => setData(e, setUsername)}
            ></input>
          </div>
          <div className={cx("form-input-group")}>
            <span className="material-symbols-outlined">lock</span>
            <input
              ref={passwordRef}
              type={eyeStatus == "on" ? "password" : "text"}
              placeholder={text.password}
              value={password}
              onChange={(e) => setData(e, setPassword)}
            ></input>
            <span
              className="material-symbols-outlined"
              onClick={handleChangeEyeStatus}
            >
              {eyeicon[eyeStatus]}
            </span>
          </div>
          <button
            className={cx(["login-btn", !loginBtnIsCanClick && "cantclick"])}
            onClick={handleLoginBtnClick}
          >
            {text.loginwithpassword}
          </button>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMinYMin slice"
        className={cx("background")}
      >
        <path
          fill="#aad6ff"
          d="M592.66 0c-15 64.092-30.7 125.285-46.598 183.777C634.056 325.56 748.348 550.932 819.642 809.5h419.672C1184.518 593.727 1083.124 290.064 902.637 0H592.66z"
        ></path>
        <path
          fill="#e8f3ff"
          d="M545.962 183.777c-53.796 196.576-111.592 361.156-163.49 490.74 11.7 44.494 22.8 89.49 33.1 134.883h404.07c-71.294-258.468-185.586-483.84-273.68-625.623z"
        ></path>
        <path
          fill="#cee7ff"
          d="M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z"
        ></path>
        <path
          fill="#e8f3ff"
          d="M153.89 0H0v809.5h415.57C345.477 500.938 240.884 211.874 153.89 0z"
        ></path>
        <path
          fill="#e8f3ff"
          d="M1144.22 501.538c52.596-134.583 101.492-290.964 134.09-463.343 1.2-6.1 2.3-12.298 3.4-18.497 0-.2.1-.4.1-.6 1.1-6.3 2.3-12.7 3.4-19.098H902.536c105.293 169.28 183.688 343.158 241.684 501.638v-.1z"
        ></path>
        <path
          fill="#eef4f8"
          d="M1285.31 0c-2.2 12.798-4.5 25.597-6.9 38.195C1321.507 86.39 1379.603 158.98 1440 257.168V0h-154.69z"
        ></path>
        <path
          fill="#e8f3ff"
          d="M1278.31,38.196C1245.81,209.874 1197.22,365.556 1144.82,499.838L1144.82,503.638C1185.82,615.924 1216.41,720.211 1239.11,809.6L1439.7,810L1439.7,256.768C1379.4,158.78 1321.41,86.288 1278.31,38.195L1278.31,38.196z"
        ></path>
      </svg>
    </div>
  );
}
export default Login;
