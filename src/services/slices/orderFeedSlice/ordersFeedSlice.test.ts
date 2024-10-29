import { getOrders } from './getOrdersFeed';
import {
  initialState,
  ordersFeedSelect,
  ordersFeedSlice
} from './ordersFeedSlice';

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

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "getOrders"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('проверка экшена начала запроса', () => {
    const state = ordersFeedSlice.reducer(initialState, {
      type: getOrders.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе загрузки';
    const state = ordersFeedSlice.reducer(initialState, {
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе загрузки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = ordersFeedSlice.reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: mockGetOrder
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockGetOrder
    });
  });
});

describe('проверка селектора', () => {
  const mockState = {
    ordersFeed: {
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
      ],
      isLoading: false,
      error: null
    }
  };

  test('проверяем что "ordersFeedSelect" возвращает корректное состояние', () => {
    const result = ordersFeedSelect(mockState);
    expect(result).toBe(mockState.ordersFeed.orders);
  });
});
