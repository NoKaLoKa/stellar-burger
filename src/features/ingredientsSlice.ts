import {
  createSlice,
  createAsyncThunk,
  createSelector,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit';

import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';
import { RootState } from '../services/store';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const getIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) =>
      ingredients && ingredients.filter((item) => item.type === type)
  );

interface DataState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: SerializedError | undefined;
}

const initialState: DataState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = false;
    },
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }
  },
  selectors: {
    getIsIngredientsLoading: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = true;
        state.ingredients = [];
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const { setIsLoading, setIngredients } = ingredientsSlice.actions;
export const { getIsIngredientsLoading, getIngredients } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
