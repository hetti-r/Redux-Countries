import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouriteReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouriteReducer,
  },
});
