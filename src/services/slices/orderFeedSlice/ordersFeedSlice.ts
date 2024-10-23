import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './getOrdersFeed';

interface IOrdersFeedState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IOrdersFeedState = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  selectors: {
    ordersFeedSelect: (state) => state.orders
  },
  extraReducers: (builder) => {
    // getOrders
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе загрузки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { ordersFeedSelect } = ordersFeedSlice.selectors;
