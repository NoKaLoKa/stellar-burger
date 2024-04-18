import ordersReducer, {
  loadFeedsThunk,
  loadOrdersThunk,
  initialState
} from '../ordersSlice';

describe('checking ordersReducer processing of actions generated when executing loadFeedsThunk', () => {
  it('receiving a request rejected', () => {
    const newState = ordersReducer(
      initialState,
      loadFeedsThunk.rejected(new Error('error'), '')
    );
    expect(newState.total).toEqual(0);
    expect(newState.totalToday).toEqual(0);
    expect(newState.orders).toEqual([]);
    expect(newState.error).toEqual('error');
  });

  it('receiving a request fullfield', () => {
    const result = {
      success: true,
      orders: [
        {
          _id: '661be93e97ede0001d0659a6',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093c'
          ],
          owner: '660d488e97ede0001d0640bf',
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2024-04-14T14:33:34.441Z',
          updatedAt: '2024-04-14T14:33:38.212Z',
          number: 38108,
          __v: 0
        }
      ],
      total: 1,
      totalToday: 1
    };
    const newState = ordersReducer(
      initialState,
      loadFeedsThunk.fulfilled(result, '')
    );

    expect(newState.total).toEqual(1);
    expect(newState.totalToday).toEqual(1);
    expect(newState.orders).toEqual([
      {
        _id: '661be93e97ede0001d0659a6',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ],
        owner: '660d488e97ede0001d0640bf',
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2024-04-14T14:33:34.441Z',
        updatedAt: '2024-04-14T14:33:38.212Z',
        number: 38108,
        __v: 0
      }
    ]);
  });
});

describe('checking ordersReducer processing of actions generated when executing loadOrdersThunk', () => {
  it('receiving a request pending', () => {
    const newState = ordersReducer(initialState, loadOrdersThunk.pending(''));
    expect(newState.isLoading).toEqual(true);
  });

  it('receiving a request fullfield', () => {
    const result = [
      {
        _id: '661be93e97ede0001d0659a6',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2024-04-14T14:33:34.441Z',
        updatedAt: '2024-04-14T14:33:38.212Z',
        number: 38108
      }
    ];
    const newState = ordersReducer(
      initialState,
      loadOrdersThunk.fulfilled(result, '')
    );

    expect(newState.isLoading).toEqual(false);
    expect(newState.orders).toEqual(result);
  });
});
