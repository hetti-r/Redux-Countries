import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase,
  auth,
  clearFavouritesFromFirebase,
  db,
  removeFavouriteToFirebase,
} from "../auth/firebase";
import { collection, getDocs, query } from "firebase/firestore";

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

    clearFavourites(state) {
      const user = auth.currentUser;
      if (user) clearFavouritesFromFirebase(user.uid);
      state.favourites = [];
    },
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload
      );
      const user = auth.currentUser;
      if (user) removeFavouriteToFirebase(user.uid, action.payload);
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, `users/${user.uid}/favourites`));
    const querySnapshot = await getDocs(q);
    const favourites = querySnapshot.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
};

export const {
  addFavourite,
  clearFavourites,
  removeFavourite,
  getFavourites,
  isLoading,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
