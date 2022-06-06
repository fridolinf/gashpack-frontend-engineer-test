import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MovieDetail from "../pages/MovieDetail";
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const CLICK_EVENT = jest.fn();
test("Should be in movie detail", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router>
        <MovieDetail />
      </Router>
    </Provider>
  );
  expect(screen.getByTestId("loading")).toBeInTheDocument();
  await waitFor(() => expect(getByTestId("to-home")).toBeInTheDocument());
});

test("Call onclick linking to home", async () => {
  render(
    <Provider store={store}>
      <Router>
        <MovieDetail onClick={CLICK_EVENT} />
      </Router>
    </Provider>
  );
  const element = await waitFor(() => screen.getByTestId("to-home"));
  userEvent.click(element);
});
