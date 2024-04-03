import { getFeedsApi, getOrdersApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const loadFeedsThunk = createAsyncThunk(
  'orders/all/get',
  async () => await getFeedsApi()
);

export const loadOrdersThunk = createAsyncThunk(
  'orders/user/get',
  async () => await getOrdersApi()
);

interface DataState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: SerializedError | undefined;
}

const initialState: DataState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setTotalOrders: (state, action) => {
      state.total = action.payload;
    },
    setTotalTodayOrders: (state, action) => {
      state.total = action.payload;
    },
    setIsOrderLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalTodayOrders: (state) => state.totalToday,
    getIsOrderLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedsThunk.rejected, (state, action) => {
        state.total = 0;
        state.totalToday = 0;
        state.orders = [];
        state.error = action.error;
      })
      .addCase(loadFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(loadOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const {
  setOrders,
  setTotalOrders,
  setTotalTodayOrders,
  setIsOrderLoading
} = ordersSlice.actions;
export const {
  getOrders,
  getTotalOrders,
  getTotalTodayOrders,
  getIsOrderLoading
} = ordersSlice.selectors;

export default ordersSlice.reducer;
