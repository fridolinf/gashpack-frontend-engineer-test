import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";

test("Should be in home", async () => {
  const { getAllByTestId, getByTestId } = render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
  await waitFor(() => expect(getAllByTestId("card-test")).toBeTruthy());
  await waitFor(() => expect(getByTestId("autocomplete")).toBeInTheDocument());
  await waitFor(() => expect(getByTestId("text-field")).toBeInTheDocument());
});

test("Call onclick linking to home", async () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
  const element = await waitFor(() => screen.getByTestId("text-field"));
  const element2 = await waitFor(() => screen.getByTestId("autocomplete"));
  expect(element).toHaveTextContent("marvel");
  expect(element2).toHaveTextContent("marvel");
});
