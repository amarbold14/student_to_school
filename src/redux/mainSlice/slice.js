import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { mainApis } from "api/mainApis";
const today = new Date();
const initialState = {
  info: {},
  openModal: false,
  toast: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    openToast: (state, action) => {
      const { type, message } = action?.payload || {};
      state.toast = {
        type,
        message,
      };
    },
    closeToast: (state) => {
      state.toast = null;
    },
  },
});

const getMain = createSelector([(state) => state.main], (main) => main);

export const mainSelectors = {
  getMain,
};
export const { closeToast } = mainSlice.actions;
export default mainSlice.reducer;
