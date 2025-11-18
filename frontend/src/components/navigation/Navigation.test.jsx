import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store.js";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("should render the Logout link", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
