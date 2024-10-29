import { describe, expect, test, jest } from '@jest/globals';
import {
  feedSelect,
  feedSlice,
  IFeedStore,
  initialState,
  ordersSelect,
  totalSelect,
  totalTodaySelect
} from './feedSlice';
import { getFeeds } from './getFeeds';
import { TOrdersData } from '@utils-types';

const mockFeed: TOrdersData = {
  orders: [
    {
      _id: '671eb06cd829be001c77944a',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-27T21:28:12.169Z',
      updatedAt: '2024-10-27T21:28:13.111Z',
      number: 57825
    },
    {
      _id: '671eafb0d829be001c779449',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-27T21:25:04.759Z',
      updatedAt: '2024-10-27T21:25:05.702Z',
      number: 57824
    },
    {
      _id: '671eaecfd829be001c779447',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0942'],
      status: 'done',
      name: 'Флюоресцентный spicy бургер',
      createdAt: '2024-10-27T21:21:19.083Z',
      updatedAt: '2024-10-27T21:21:20.037Z',
      number: 57823
    },
    {
      _id: '671eac3ed829be001c779438',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-10-27T21:10:22.634Z',
      updatedAt: '2024-10-27T21:10:23.554Z',
      number: 57822
    },
    {
      _id: '671ea842d829be001c77942a',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-27T20:53:22.825Z',
      updatedAt: '2024-10-27T20:53:23.533Z',
      number: 57821
    }
  ],
  total: 5,
  totalToday: 5
};

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "getFeeds"', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('проверка начального состония', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('проверка экшена начала запроса', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка при загрузке';
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе загрузки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.fulfilled.type,
      payload: mockFeed
    });
    expect(state).toEqual({
      ...initialState,
      feed: mockFeed,
      isLoading: false,
      error: null
    });
  });
});

describe('проверка селектора', () => {
  const mockState: { feed: IFeedStore } = {
    feed: {
      feed: {
        orders: [
          {
            _id: '671eb06cd829be001c77944a',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-10-27T21:28:12.169Z',
            updatedAt: '2024-10-27T21:28:13.111Z',
            number: 57825
          },
          {
            _id: '671eafb0d829be001c779449',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-10-27T21:25:04.759Z',
            updatedAt: '2024-10-27T21:25:05.702Z',
            number: 57824
          }
        ],
        total: 5,
        totalToday: 2
      },
      isLoading: false,
      error: null
    }
  };

  test('проверяем что "feedSelect" возвращает корректное состояние', () => {
    const result = feedSelect(mockState);
    expect(result).toEqual(mockState.feed.feed);
  });

  test('проверяем что "ordersSelect" возвращает корректное состояние', () => {
    const result = ordersSelect(mockState);
    expect(result).toEqual(mockState.feed.feed.orders);
  });

  test('проверяем что "totalSelect" возвращает корректное состояние', () => {
    const result = totalSelect(mockState);
    expect(result).toBe(mockState.feed.feed.total);
  });

  test('проверяем что "totalTodaySelect" возвращает корректное состояние', () => {
    const result = totalTodaySelect(mockState);
    expect(result).toBe(mockState.feed.feed.totalToday);
  });
});
