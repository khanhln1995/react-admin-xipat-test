import { createSlice } from "@reduxjs/toolkit";
import { getLastSevenDays } from "../util/getLastSevenDays";
import { getDaysBetween } from "../util/getDaysBetween";
const initialChartFilterState = {
  date: getLastSevenDays(),
};

const chartFilterSlice = createSlice({
  name: "chartFilter",
  initialState: initialChartFilterState,
  reducers: {
    setDate(state, action) {
      if (action.payload === "The Last 7 days") {
        state.date = getLastSevenDays();
      } else {
        console.log("asdasd");
        state.date = getDaysBetween(action.payload);
      }
    },
  },
});

export const chartFilterActions = chartFilterSlice.actions;
export default chartFilterSlice.reducer;
