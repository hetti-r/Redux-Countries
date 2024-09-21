import { createSlice } from "@reduxjs/toolkit";
import { isLoading } from "./countriesSlice";
import { addFavouriteToFirebase } from "../auth/firebase";
import { collection, query } from "firebase/firestore";

const initialState = {
  favourites: [],
  isLoading: true,
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
      const user = auth.currentUser;
      if (user) addFavouriteToFirebase(user.uid, action.payload);
    },
    clearFavourite(state) {
      state.favourites = [];
    },
    getFavourites(state, action) {},
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload
      );
    },
  },
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, `users/${user.id}/favourites`));
    const favourites = q.docs.map((doc) => doc.data().name);
    dispatch;
  }
};

export const { addFavourite, clearFavourite, removeFavourite } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
