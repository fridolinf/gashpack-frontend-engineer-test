import React from "react";
import MovieDetail from "../pages/MovieDetail";
import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../redux/store";
import { mockMovies, mockMovie } from "../mockTest";
import Home from "../pages/Home";
import api from "../utils/api/baseUrl";
const Get = axios.get(`${api.BASE_URL}s=marvel&page=1`);
jest.mock("axios");
test("Fetch data", async () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
        <MovieDetail />
      </Router>
    </Provider>
  );
  axios.get.mockResolvedValue(mockMovie);
  axios.get.mockResolvedValue(mockMovies);
});
