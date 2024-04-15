import constructorReducer, { initialState } from '../constructorSlice';

describe('constructor tests', () => {
  it("checking reducer's work while proccessing addIngredient and deleteIngredient actions", () => {
    const ingredient = {
      id: '123',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    let newState = constructorReducer(initialState, {
      payload: ingredient,
      type: 'orderConstructor/addIngredient'
    });

    expect(newState).toEqual({
      bun: null,
      ingredients: [
        {
          id: '123',
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        }
      ]
    });

    newState = constructorReducer(newState, {
      payload: '123',
      type: 'orderConstructor/deleteIngredient'
    });

    expect(newState).toEqual(initialState);
  });
});
