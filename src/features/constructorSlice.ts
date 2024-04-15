import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

interface DataState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: DataState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push({ ...action.payload });
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = v4();
        return { payload: { ...ingredient, id: id } };
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
