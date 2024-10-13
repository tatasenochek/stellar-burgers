import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, postOrderBurger } from './fetchNewOrder';

interface INewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: INewOrderState = {
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clear: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    orderRequestSelect: (state) => state.orderRequest,
    orderModalDataSelect: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderBurger.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(postOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = `Ошибка в процессе отправки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе загрузки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const { clear } = newOrderSlice.actions;
export const { orderRequestSelect, orderModalDataSelect } =
  newOrderSlice.selectors;
