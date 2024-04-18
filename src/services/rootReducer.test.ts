import { rootReducer } from './store';

describe('rootReducer tests', () => {
  it('testing rootReducer with undefined and an action, that is not processed by any reducer', () => {
    const initialState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: undefined
      },
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: undefined
      },
      newOrder: {
        orderRequest: false,
        orderModalData: null,
        error: undefined
      },
      orderConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        isAuth: false,
        error: undefined
      }
    };
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(newState.ingredients).toEqual(initialState.ingredients);
  });
});
