import { TOrder } from '@utils-types';
import { getOrderByNumber, postOrderBurger } from './fetchNewOrder';
import {
  clear,
  initialState,
  newOrderSlice,
  orderModalDataSelect,
  orderRequestSelect
} from './newOrderSlice';

const mockOrder: TOrder = {
  _id: '671d0902d829be001c7790a5',
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2024-10-26T15:21:38.676Z',
  updatedAt: '2024-10-26T15:21:39.424Z',
  number: 57707,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
};

const mockPostOrder = {
  success: true,
  name: 'Краторный био-марсианский бургер',
  order: {
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    _id: '671d0902d829be001c7790a5',
    owner: {
      name: 'Наталия',
      email: 'tata@aa.ss',
      createdAt: '2024-10-10T12:17:38.357Z',
      updatedAt: '2024-10-10T12:17:38.357Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-10-26T15:21:38.676Z',
    updatedAt: '2024-10-26T15:21:39.424Z',
    number: 57707,
    price: 2934
  }
};

const mockGetOrder = {
  success: true,
  orders: [
    {
      _id: '671b98b4d829be001c778c1d',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      owner: '6707c5e2d829be001c77586b',
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-10-25T13:10:12.081Z',
      updatedAt: '2024-10-25T13:10:12.922Z',
      number: 57575
    }
  ]
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('проверка редюсера', () => {
  it('проверяем что очищаются заказы', () => {
    const result = newOrderSlice.reducer(
      {
        ...initialState,
        orderModalData: mockOrder,
        orderRequest: true
      },
      clear()
    );

    expect(result.orderModalData).toBeNull();
    expect(result.orderRequest).toBe(false);
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "postOrderBurger"', () => {
  test('проверка начального состония', () => {
    expect(newOrderSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('проверка экшена начала запроса', () => {
    const state = newOrderSlice.reducer(initialState, {
      type: postOrderBurger.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе отправки';
    const state = newOrderSlice.reducer(initialState, {
      type: postOrderBurger.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      isLoading: false,
      error: `Ошибка в процессе отправки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = newOrderSlice.reducer(initialState, {
      type: postOrderBurger.fulfilled.type,
      payload: mockPostOrder
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orderRequest: false,
      orderModalData: mockPostOrder.order,
      error: null
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "getOrderByNumber"', () => {
  test('проверка экшена начала запроса', () => {
    const state = newOrderSlice.reducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе загрузки';
    const state = newOrderSlice.reducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе загрузки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = newOrderSlice.reducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockGetOrder
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orderModalData: mockGetOrder.orders[0]
    });
  });
});

describe('проверка селектора', () => {
  const mockState = {
    newOrder: {
      orderRequest: true,
      orderModalData: {
        _id: '671b98b4d829be001c778c1d',
        name: 'Краторный био-марсианский бургер',
        status: 'done',
        createdAt: '2024-10-25T13:10:12.081Z',
        updatedAt: '2024-10-25T13:10:12.922Z',
        number: 57575,
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ]
      },
      isLoading: false,
      error: null
    }
  };

  test('проверяем что "orderRequestSelect" возвращает корректное состояние', () => {
    const result = orderRequestSelect(mockState);
    expect(result).toBe(true);
  });

  test('проверяем что "orderModalDataSelect" возвращает корректное состояние', () => {
    const result = orderModalDataSelect(mockState);
    expect(result).toEqual(mockState.newOrder.orderModalData);
  });
});
