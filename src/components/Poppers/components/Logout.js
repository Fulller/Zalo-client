function Logout({ cx, title, icon }) {
  return (
    <div className={cx("popper-item")}>
      {icon && <button className={cx("icon")}>{icon}</button>}
      <span className={cx("title-item")}>{title}</span>
    </div>
  );
}
export default Logout;
