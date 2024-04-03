import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredientsSlice';
import ordersReducer from '../features/ordersSlice';
import newOrderReducer from '../features/newOrderSlice';
import constructorReducer from '../features/constructorSlice';
import userReducer from '../features/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  newOrder: newOrderReducer,
  orderConstructor: constructorReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
