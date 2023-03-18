import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IApp {
  loading?: boolean;
  money: number;
}

const initialState: IApp = {
  loading: false,
  money: 100000000,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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

export const selectLoading = (state: RootState): boolean | undefined =>
  state.app.loading;

export const getCurrentMoney = (state: RootState): number => state.app.money;

export default appSlice.reducer;
