import style from "./UpdateUser.module.scss";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import selector from "../../../redux/selector";
import Image from "../../../Images";
import Background from "../components/Background";
import imageLink from "../../../Images/link";
import useText from "../../../hooks/useText";
import userSlide from "../../../redux/slides/user";
import settingSlide from "../../../redux/slides/setting";
import services from "../../../services";
import { useState } from "react";

const cx = classNames.bind(style);
function UpdataUser({ data }) {
  let user = useSelector(selector.user);
  let dispatch = useDispatch();
  let [isUpdate, setIsUpdate] = useState(false);
  let [file, setFile] = useState(null);
  let [filebg, setFilebg] = useState(null);
  let [showname, setShowname] = useState(user?.showName);
  let text = useText("module");
  function handleEnteringShowname(e) {
    if (!isUpdate) {
      setIsUpdate(true);
    }
    setShowname(e.target.value);
  }
  function handleSelectFile(e) {
    if (!isUpdate) {
      setIsUpdate(true);
    }
    setFile(e.target.files[0]);
  }
  function handleSelectFileBg(e) {
    if (!isUpdate) {
      setIsUpdate(true);
    }
    setFilebg(e.target.files[0]);
  }
  function handleCancelUpdate() {
    dispatch(
      settingSlide.actions.setModule({
        isShow: false,
      })
    );
  }
  async function handleUpdateInfo() {
    if (isUpdate) {
      let avatar = user.avatar;
      if (file) {
        let response = await services.uploadImage(file);
        if (response.isSuccess) {
          avatar = response.data;
        }
      }
      let background = user.background;
      if (filebg) {
        let responsefilegb = await services.uploadImage(filebg);
        if (responsefilegb.isSuccess) {
          background = responsefilegb.data;
        }
      }
      let response = await services.updateinfouser({
        userName: user.userName,
        showName: showname,
        avatar: avatar,
        background: background,
      });
      if (response.isSuccess) {
        dispatch(
          userSlide.actions.updateUser({
            avatar: avatar,
            showName: showname,
            background: background,
          })
        );
      }
      dispatch(
        settingSlide.actions.setModule({
          isShow: false,
        })
      );
    }
  }
  return (
    <div className={cx("updateuser")}>
      <h3>Cập nhật thông tin</h3>
      <div className={cx("top")}>
        <input
          type="file"
          accept="image/*"
          id="backgroundfile"
          onInput={handleSelectFileBg}
        ></input>
        <label htmlFor="backgroundfile">
          {filebg ? (
            <Background
              className={cx("background")}
              src={URL.createObjectURL(filebg)}
              id={false}
            ></Background>
          ) : (
            <Background
              className={cx("background")}
              src={user.background}
            ></Background>
          )}
        </label>
        <div className={cx("avatar")}>
          <input
            type="file"
            accept="image/*"
            id="avatarfile"
            onInput={handleSelectFile}
          ></input>
          <label htmlFor="avatarfile">
            {file ? (
              <Image
                className={cx("avatar-img")}
                src={URL.createObjectURL(file)}
              ></Image>
            ) : (
              <Image className={cx("avatar-img")} src={user.avatar} id></Image>
            )}
            <span className={cx(["material-symbols-rounded", "avatar-button"])}>
              photo_camera
            </span>
          </label>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("showname")}>
          <span>{text.showname}</span>
          <input
            spellCheck="false"
            defaultValue={user.showName}
            onChange={handleEnteringShowname}
            value={showname}
          ></input>
          <p>{text.pleaseuserealname}</p>
        </div>
      </div>
      <div className={cx("buttons")}>
        <button className={cx("button-cancel")} onClick={handleCancelUpdate}>
          {text.cancel}
        </button>
        <button
          className={cx(["button-update", isUpdate && "active"])}
          onClick={handleUpdateInfo}
        >
          {text.update}
        </button>
      </div>
    </div>
  );
}

export default UpdataUser;
