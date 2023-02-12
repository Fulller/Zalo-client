import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slides/user";
import settingSlide from "./slides/setting";

export default configureStore({
  reducer: {
    user: userSlide.reducer,
    setting: settingSlide.reducer,
  },
});
