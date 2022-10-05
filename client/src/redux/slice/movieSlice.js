import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie_list: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movie_list = [...action.payload, ...state.movie_list];
    },
    deleteMovie: (state, action) => {
      state.movie_list = [
        ...state.movie_list.filter((movie) => movie.id != action.payload),
      ];
    },
  },
});

export const { addMovie, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;
