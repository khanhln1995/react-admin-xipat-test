import { configureStore } from "@reduxjs/toolkit";

import chartFilterReducer from "./chartFilterSlice";

export const store = configureStore({
  reducer: {
    chartFilter: chartFilterReducer,
  },
});
