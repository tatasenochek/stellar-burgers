import { test, expect } from '@jest/globals';
import { rootReducer } from './rootReducer';
import store from './store';

test('проверяем правильную настройку и работу rootReducer', () => {
  expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
    store.getState()
  );
});
