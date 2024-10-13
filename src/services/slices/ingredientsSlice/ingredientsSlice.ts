import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './getIngredients';

export interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null
};
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelect: (state) => state.ingredients,
    isLoadingSelect: (state) => state.isLoading,
    bunsSelect: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    mainsSelect: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    saucesSelect: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `Ошибка в процессе загрузки: ${action.error.message || 'Неизвестная ошибка'}`;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  ingredientsSelect,
  isLoadingSelect,
  bunsSelect,
  mainsSelect,
  saucesSelect
} = ingredientsSlice.selectors;
