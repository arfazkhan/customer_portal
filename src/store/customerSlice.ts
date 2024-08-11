// src/store/customerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../types/Customer';
import { generateCustomers } from '../utils/customerGenerator';

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: number | null;
  loading: boolean;
  hasNextPage: boolean;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomerId: null,
  loading: false,
  hasNextPage: true,
};

export const fetchInitialCustomers = createAsyncThunk(
  'customers/fetchInitial',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateCustomers(10);
  }
);

export const fetchMoreCustomers = createAsyncThunk(
  'customers/fetchMore',
  async (_, { getState }) => {
    const state = getState() as { customers: CustomerState };
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateCustomers(20);
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    selectCustomer: (state, action: PayloadAction<number>) => {
      state.selectedCustomerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoreCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreCustomers.fulfilled, (state, action) => {
        state.customers = [...state.customers, ...action.payload];
        state.loading = false;
        if (state.customers.length >= 1000) {
          state.hasNextPage = false;
        }
      });
  },
});

export const { selectCustomer } = customerSlice.actions;
export default customerSlice.reducer;