import {
  checkUserAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './fetchUser';
import {
  authChecked,
  clearError,
  errorSelect,
  initialState,
  isAuthCheckedSelect,
  isLoadingSelect,
  userSelect,
  userSlice
} from './userSlice';

const mockUser = {
  email: 'tata@aa.ss',
  name: 'Наталия'
};

const mockUpdateUser = {
  email: 'tata@aa.ss',
  name: 'Tata'
};

const mockState = {
  user: {
    user: mockUser,
    isAuthChecked: true,
    isLoading: false,
    error: null
  }
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('проверка редюсера', () => {
  it('проверяем что изменяется значение авторизации', () => {
    const result = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: true
      },
      authChecked()
    );

    expect(result.isAuthChecked).toBe(true);
  });

  it('проверяем что ошибки сбрасываются', () => {
    const errorMessage = 'Ошибка';
    const result = userSlice.reducer(
      {
        ...initialState,
        error: errorMessage
      },
      clearError()
    );

    expect(result.error).toBe(null);
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "logoutUser"', () => {
  test('проверка начального состония', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе выхода';
    const state = userSlice.reducer(initialState, {
      type: logoutUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе выхода: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: mockUser
    });
    expect(state).toEqual({
      ...initialState,
      user: null
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "updateUser"', () => {
  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе обновления';
    const state = userSlice.reducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе обновления: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    });
    expect(state).toEqual({
      ...initialState,
      user: mockUser
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "getUser"', () => {
  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: getUser.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе загрузки';
    const state = userSlice.reducer(initialState, {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе загрузки: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "loginUser"', () => {
  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе входа';
    const state = userSlice.reducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка в процессе входа: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: mockUser
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "registerUser"', () => {
  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Ошибка в процессе регистрации';
    const state = userSlice.reducer(initialState, {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: false,
      error: `Ошибка в процессе регистрации: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: mockUser
    });
  });
});

describe('проверяем обработку редьюсером экшенов генерируемых при выполнении асинхронного запроса "checkUserAuth"', () => {
  test('проверка экшена начала запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: checkUserAuth.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка ошибки запроса', () => {
    const errorMessage = 'Пользователь не зарегистрирован';
    const state = userSlice.reducer(initialState, {
      type: checkUserAuth.rejected.type,
      error: { message: errorMessage }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      error: `Пользователь не зарегистрирован: ${errorMessage}`
    });
  });

  test('проверка успешного выполнения запроса', () => {
    const state = userSlice.reducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: null
    });
  });
});

describe('проверка селектора', () => {
  test('проверяем что "userSelect" возвращает корректное состояние', () => {
    const result = userSelect(mockState);
    expect(result).toEqual(mockUser);
  });

  test('проверяем что "errorSelect" возвращает корректное состояние', () => {
    const errorMessage = 'Ошибка';
    const result = errorSelect({
      ...mockState,
      user: { ...initialState, error: errorMessage }
    });
    expect(result).toBe(errorMessage);
  });

  test('проверяем что "isLoadingSelect" возвращает корректное состояние', () => {
    const result = isLoadingSelect({
      ...mockState,
      user: { ...initialState, isLoading: true }
    });
    expect(result).toBe(true);
  });

  test('проверяем что "isAuthCheckedSelect" возвращает корректное состояние', () => {
    const result = isAuthCheckedSelect(mockState);
    expect(result).toBe(true);
  });
});
