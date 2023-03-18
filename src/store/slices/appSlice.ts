import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IApp {
  loading?: number;
  money: number;
}

const initialState: IApp = {
  loading: 0,
  money: 100000000,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      const currentLoading = state.loading;
      state.loading = action.payload ? currentLoading + 1 : currentLoading - 1;
    },
    increase: (state: IApp, action: PayloadAction<number>) => {
      state.money = state.money + action.payload;
    },
    priceBet: (state: IApp, action: PayloadAction<number>) => {
      state.money = state.money - action.payload;
    },
    winBet: (state: IApp, action: PayloadAction<number>) => {
      state.money = state.money + action.payload;
    },
  },
});

export const { setLoading, priceBet, winBet } = appSlice.actions;

export const selectLoading = (state: RootState): number | undefined =>
  state.app.loading;

export const getCurrentMoney = (state: RootState): number => state.app.money;

export default appSlice.reducer;
