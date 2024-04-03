import { orderBurgerApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrderThunk = createAsyncThunk(
  'newOrder/create',
  async (ordersIds: string[]) => await orderBurgerApi(ordersIds)
);

interface DataState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: DataState = {
  orderRequest: false,
  orderModalData: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    },
    resetOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { setOrderRequest, setOrderModalData, resetOrderModalData } =
  newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;

export default newOrderSlice.reducer;
