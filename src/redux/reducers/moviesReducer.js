import * as t from "../actions/types";

const initialState = {
  movies: [],
  movie: {
    Poster: "",
    Title: "",
    Actors: "",
    Awards: "",
    Country: "",
    DVD: "",
    Director: "",
    Genre: "",
    Language: "",
    Plot: "",
    Released: "",
    Writer: "",
    Year: "",
    imdbRating: "",
  },
  error: null,
  loading: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case t.REQUEST_MOVIES_BY_KEYWORD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case t.SUCCESS_GET_MOVIES_BY_KEYWORD:
      return {
        ...state,
        loading: false,
        movies: action.data,
        error: null,
      };
    case t.REQUEST_MOVIES_BY_TITLE:
      return {
        ...state,
        loading: true,
        movie: {},
        error: null,
      };
    case t.SUCCESS_GET_MOVIES_BY_TITLE:
      return {
        ...state,
        loading: false,
        movie: {
          ...state.movie,
          Poster: action.data.Poster,
          Title: action.data.Title,
          Actors: action.data.Actors,
          Awards: action.data.Awards,
          Country: action.data.Country,
          DVD: action.data.DVD,
          Director: action.data.Director,
          Genre: action.data.Genre,
          Language: action.data.Language,
          Plot: action.data.Plot,
          Released: action.data.Released,
          Writer: action.data.Writer,
          Year: action.data.Year,
          imdbRating: action.data.imdbRating,
        },
        error: null,
      };
  }
};
export default moviesReducer;
