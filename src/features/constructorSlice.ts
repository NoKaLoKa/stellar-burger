import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface DataState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: DataState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (state, action) => {
      const { index, step } = action.payload;
      [state.ingredients[index], state.ingredients[index + step]] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    resetConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export const { getConstructor } = constructorSlice.selectors;

export default constructorSlice.reducer;
