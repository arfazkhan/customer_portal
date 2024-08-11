// src/store/customerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../types/Customer';
import { generateCustomers } from '../utils/customerGenerator';

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: number | null;
  loading: boolean;
  hasNextPage: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomerId: null,
  loading: false,
  hasNextPage: true,
  error: null,
};

export const fetchInitialCustomers = createAsyncThunk(
  'customers/fetchInitial',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateCustomers(10);
    } catch (error) {
      return rejectWithValue('Failed to fetch initial customers');
    }
  }
);

export const fetchMoreCustomers = createAsyncThunk(
  'customers/fetchMore',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { customers: CustomerState };
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateCustomers(20);
    } catch (error) {
      return rejectWithValue('Failed to fetch more customers');
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    selectCustomer: (state, action: PayloadAction<number>) => {
      state.selectedCustomerId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchInitialCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreCustomers.fulfilled, (state, action) => {
        state.customers = [...state.customers, ...action.payload];
        state.loading = false;
        if (state.customers.length >= 1000) {
          state.hasNextPage = false;
        }
      })
      .addCase(fetchMoreCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectCustomer, clearError } = customerSlice.actions;
export default customerSlice.reducer;