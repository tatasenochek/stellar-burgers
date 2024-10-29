import { describe, expect } from '@jest/globals';
import { TConstructorIngredient } from '@utils-types';
import {
  addItem,
  burgerConstructorSlice,
  clearItems,
  deleteItem,
  IBurgerConstructorState,
  initialState,
  itemSelect,
  moveItem
} from './burgerConstructorSlice';

const bun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  id: '1'
};

const main: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  id: '2'
};

const sauce: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  id: '3'
};

const burger: IBurgerConstructorState = {
  ...initialState,
  ingredients: [bun, main, sauce]
};

describe('проверка редюсера', () => {
  test('проверяем добавление ингредиента с типом "bun"', () => {
    const result = burgerConstructorSlice.reducer(initialState, addItem(bun));
    expect(result.bun).toEqual({ ...bun, id: expect.any(String) });
  });

  test('проверяем добавление ингредиента с типом отличающимся от "bun"', () => {
    const result = burgerConstructorSlice.reducer(initialState, addItem(main));
    expect(result.ingredients).toContainEqual({
      ...main,
      id: expect.any(String)
    });
  });

  test('проверяем перемещение ингредиента', () => {
    const result = burgerConstructorSlice.reducer(
      burger,
      moveItem({ from: 2, to: 1 })
    );
    expect(result.ingredients).toEqual([bun, sauce, main]);
  });

  test('проверяем удаление одного ингредиента', () => {
    const result = burgerConstructorSlice.reducer(burger, deleteItem(sauce.id));
    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients).toEqual([bun, main]);
  });

  test('проверяем очистку конструктора от всех ингредиентов', () => {
    const result = burgerConstructorSlice.reducer(burger, clearItems());
    expect(result.ingredients).toHaveLength(0);
    expect(result).toEqual(initialState);
  });
});

describe('проверка селектора', () => {
  test('проверяем что "itemSelect" возвращает корректное состояние', () => {
    const state = {
      'burger-constructor': {
        bun,
        ingredients: [bun, main, sauce]
      }
    };
    const result = itemSelect(state);
    expect(result).toEqual(state['burger-constructor']);
  });
});
