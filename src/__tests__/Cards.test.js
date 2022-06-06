import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Cards from "../components/Cards";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";

const CLICK_EVENT = jest.fn();
test("Should be in cards", () => {
  render(
    <Provider store={store}>
      <Router>
        <Cards />
      </Router>
    </Provider>
  );
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByTestId("typography")).toBeInTheDocument();
});

test("Call onclick in card media", () => {
  render(
    <Provider store={store}>
      <Router>
        <Cards onClick={CLICK_EVENT} />
      </Router>
    </Provider>
  );
  const element = screen.getByTestId("imgOpen");
  userEvent.click(element);
});

test("Call onclick linking to detail", () => {
  render(
    <Provider store={store}>
      <Router>
        <Cards onClick={CLICK_EVENT} />
      </Router>
    </Provider>
  );
  const element = screen.getByTestId("linking-detail");
  userEvent.click(element);
});
