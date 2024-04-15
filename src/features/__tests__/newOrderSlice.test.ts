import newOrderReducer, {
  createOrderThunk,
  initialState
} from '../newOrderSlice';

describe('checking newOrderReducer processing of actions generated when executing createOrderThunk', () => {
  it('receiving a request pending', () => {
    const newState = newOrderReducer(
      initialState,
      createOrderThunk.pending('', [''])
    );
    expect(newState.orderRequest).toEqual(true);
  });

  it('receiving a request rejected', () => {
    const newState = newOrderReducer(
      initialState,
      createOrderThunk.rejected(new Error('error'), '', [''])
    );
    expect(newState.error).toEqual('error');
  });

  it('receiving a request fullfield', () => {
    const result = {
      success: true,
      name: 'Краторный био-марсианский бургер',
      order: {
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
    };
    const newState = newOrderReducer(
      initialState,
      createOrderThunk.fulfilled(result, '', [''])
    );

    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderModalData).toEqual(result.order);
  });
});
