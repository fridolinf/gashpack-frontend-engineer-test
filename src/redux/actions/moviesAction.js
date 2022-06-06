import * as t from "./types";

export const getMoviesByKeyword = (data) => {
  return { type: t.SUCCESS_GET_MOVIES_BY_KEYWORD, data };
};
export const requestMoviesByKeyword = () => {
  return { type: t.REQUEST_MOVIES_BY_KEYWORD };
};

export const getMoviesByTitle = (data) => {
  return { type: t.SUCCESS_GET_MOVIES_BY_TITLE, data };
};
export const requestMoviesByTitle = () => {
  return { type: t.REQUEST_MOVIES_BY_TITLE };
};
