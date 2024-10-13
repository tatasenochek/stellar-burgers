import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IBurgerConstructorState {
  bun: TConstructorIngredient | TIngredient | null;
  ingredients: TConstructorIngredient[];
}

type TMoveItem = {
  from: number;
  to: number;
};

export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    moveItem: (state, action: PayloadAction<TMoveItem>) => {
      const { from, to } = action.payload;
      const [moveIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moveIngredient);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearItems: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    itemSelect: (state) => state
  }
});

export const { addItem, moveItem, deleteItem, clearItems } =
  burgerConstructorSlice.actions;
export const { itemSelect } = burgerConstructorSlice.selectors;
