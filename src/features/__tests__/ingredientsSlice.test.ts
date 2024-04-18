import ingredientsReducer, {
  getIngredientsThunk,
  initialState
} from '../ingredientsSlice';

describe('checking ingredientsReducer processing of actions generated when executing getIngredientsThunk', () => {
  it('receiving a request pending', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.pending('')
    );
    expect(newState.isLoading).toEqual(true);
  });

  it('receiving a request rejected', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.rejected(new Error('error'), '')
    );
    expect(newState.error).toEqual('error');
    expect(newState.isLoading).toEqual(true);
    expect(newState.ingredients).toEqual([]);
  });

  it('receiving a request fullfield', () => {
    const result = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];
    const newState = ingredientsReducer(
      initialState,
      getIngredientsThunk.fulfilled(result, '')
    );
    expect(newState.ingredients).toEqual(result);
  });
});
