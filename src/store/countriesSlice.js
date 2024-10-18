import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  isLoading: true,
  search: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,

  reducers: {
    // take data (payload) into countries array
    getCountries(state, action) {
      state.countries = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    search(state, action) {
      state.search = action.payload;
    },

    clearSearch(state) {
      state.search = "";
    },
  },

  extraReducers() {},
});

export const { getCountries, isLoading, search, clearSearch } =
  countriesSlice.actions;
// this is  the connectiuon to store.js
export default countriesSlice.reducer;
