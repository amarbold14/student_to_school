import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "#redux/mainSlice/slice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
