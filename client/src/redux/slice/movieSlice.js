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
      state.movie_list = [...action.payload, ...state.movie_list];
    },
    deleteMovie: (state, action) => {
      state.movie_list = [
        ...state.movie_list.filter((movie) => movie.id != action.payload),
      ];
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
  deleteMovie,
  setSameUserData,
  movieSliceReset,
} = movieSlice.actions;
export default movieSlice.reducer;
