// function get(key, defaultValue) {
//   let result = JSON.parse(localStorage.getItem("zalo_" + key));
//   switch (typeof defaultValue) {
//     case "object": {
//       if (
//         result &&
//         Object.keys(result).length == Object.keys(defaultValue).length &&
//         Object.keys(result).every((keyItem) => {
//           return Object.keys(defaultValue).includes(keyItem);
//         })
//       ) {
//         return result;
//       } else {
//         localStorage.setItem("zalo_" + key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     }
//     default: {
//       if (result != null) {
//         return result;
//       } else {
//         localStorage.setItem("zalo_" + key, JSON.stringify(defaultValue));
//         return defaultValue;
//       }
//     }
//   }
// }
function get(key, defaultValue) {
  let result = JSON.parse(localStorage.getItem("zalo_" + key));
  if (result) {
    return result;
  } else {
    localStorage.setItem("zalo_" + key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}
function set(key, value) {
  localStorage.setItem("zalo_" + key, JSON.stringify(value));
}
export default { get, set };
