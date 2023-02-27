function Image({ src, className, isUser }) {
  return (
    <img
      className={className}
      src={src}
      onError={(e) => {
        if (isUser) {
          e.target.src =
            "https://images.assetsdelivery.com/compings_v2/koblizeek/koblizeek2001/koblizeek200100050.jpg";
        } else {
          e.target.src =
            "https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg";
        }
      }}
    ></img>
  );
}
export default Image;
