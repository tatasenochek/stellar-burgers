import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { newOrderSlice } from './slices/newOrderSlice/newOrderSlice';
import { ordersFeedSlice } from './slices/orderFeedSlice/ordersFeedSlice';
import { userSlice } from './slices/userSlice/userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  newOrderSlice,
  ordersFeedSlice,
  userSlice
);
