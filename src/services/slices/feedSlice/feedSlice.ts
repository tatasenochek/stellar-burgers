import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeeds } from './getFeeds';

export interface IFeedStore {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IFeedStore = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    feedSelect: (state) => state.feed,
    ordersSelect: (state) => state.feed.orders,
    totalSelect: (state) => state.feed.total,
    totalTodaySelect: (state) => state.feed.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе загрузки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  }
});

export const { feedSelect, ordersSelect, totalSelect, totalTodaySelect } =
  feedSlice.selectors;
