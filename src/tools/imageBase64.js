export default function (img) {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  return `data:${img.contentType};base64,
        ${toBase64(img.data.data)}`;
}
