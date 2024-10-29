import { TIngredient } from '@utils-types';
import {
  bunsSelect,
  IIngredientsState,
  ingredientsSelect,
  ingredientsSlice,
  initialState,
  isLoadingSelect,
  mainsSelect,
  saucesSelect
} from './ingredientsSlice';
import { getIngredients } from './getIngredients';

const mockIngredients: TIngredient[] = [
  {
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
    image_large: 'test'
  },
  {
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
    image_large: 'test'
  },
  {
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
    image_large: 'test'
  }
];

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "getIngredients"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('проверка начального состония', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('проверка экшена начала запроса', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка при загрузке';
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе загрузки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    });
    expect(state).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });
});

describe('проверка селектора', () => {
  const mockState: { ingredients: IIngredientsState } = {
    ingredients: {
      ingredients: [
        {
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
          image_large: 'test'
        },
        {
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
          image_large: 'test'
        },
        {
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
          image_large: 'test'
        }
      ],
      isLoading: false,
      error: null
    }
  };

  test('проверяем что "ingredientsSelect" возвращает корректное состояние', () => {
    const result = ingredientsSelect(mockState);
    expect(result).toEqual(mockState.ingredients.ingredients);
  });

  test('проверяем что "isLoadingSelect" возвращает корректное состояние', () => {
    const result = isLoadingSelect(mockState);
    expect(result).toEqual(mockState.ingredients.isLoading);
  });

  test('проверяем что "bunsSelect" возвращает корректное состояние', () => {
    const result = bunsSelect(mockState);
    expect(result).toEqual([
      {
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
        image_large: 'test'
      }
    ]);
  });

  test('проверяем что "mainsSelect" возвращает корректное состояние', () => {
    const result = mainsSelect(mockState);
    expect(result).toEqual([
      {
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
        image_large: 'test'
      }
    ]);
  });

  test('проверяем что "saucesSelect" возвращает корректное состояние', () => {
    const result = saucesSelect(mockState);
    expect(result).toEqual([
      {
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
        image_large: 'test'
      }
    ]);
  });
});
