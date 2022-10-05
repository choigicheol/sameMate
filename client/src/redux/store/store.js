import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "../slice/movieSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
  },
});
