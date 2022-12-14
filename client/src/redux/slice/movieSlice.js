import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie_list: [],
  sameUserData: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie_list = [...action.payload];
    },
    addMovie: (state, action) => {
      state.movie_list = [action.payload, ...state.movie_list];
    },
    deleteMovies: (state, action) => {
      state.movie_list = state.movie_list.filter(
        (movie) => movie.title !== action.payload.title
      );
    },
    setSameUserData: (state, action) => {
      state.sameUserData = [...action.payload];
    },
    movieSliceReset: (state) => {
      state.movie_list = [];
      state.sameUserData = [];
    },
  },
});

export const {
  setMovie,
  addMovie,
  deleteMovies,
  setSameUserData,
  movieSliceReset,
} = movieSlice.actions;
export default movieSlice.reducer;
