function Recall({ cx, title, icon }) {
  return (
    <div className={cx(["popper-item", "important"])}>
      {icon && (
        <button className={cx("icon")}>
          <span className="material-symbols-rounded">rotate_left</span>
        </button>
      )}
      <span className={cx("title-item")}>{title}</span>
    </div>
  );
}
export default Recall;
