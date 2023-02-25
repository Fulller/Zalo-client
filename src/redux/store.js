import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slides/user";
import settingSlide from "./slides/setting";
import datauserSlide from "./slides/datauser";

export default configureStore({
  reducer: {
    user: userSlide.reducer,
    setting: settingSlide.reducer,
    datauser: datauserSlide.reducer,
  },
});
