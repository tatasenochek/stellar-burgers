import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk(
  'orders/getFeeds',
  async () => await getFeedsApi()
);
