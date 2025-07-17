import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { searchProducts } from '../../services/api';

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchProducts(query);
      return { results: response, query };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const initialState = {
  results: [],
  recentSearches: [],
  isLoading: false,
  error: null,
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addToRecentSearches: (state, action) => {
      const query = action.payload;
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query);
        state.recentSearches = state.recentSearches.slice(0, 5); // Keep only 5 recent searches
        AsyncStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
      }
    },
    loadRecentSearches: (state, action) => {
      state.recentSearches = action.payload || [];
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      AsyncStorage.removeItem('recentSearches');
    },
    clearResults: (state) => {
      state.results = [];
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results.products;
        state.query = action.payload.query;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addToRecentSearches, loadRecentSearches, clearRecentSearches, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
