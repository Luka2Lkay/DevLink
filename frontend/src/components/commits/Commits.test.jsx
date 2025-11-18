import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store.js";
import Commits from "./Commits";

describe("Commits Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Commits />
        </Provider>
      </MemoryRouter>
    );
  });

  it("renders Commits component", () => {
    const headingElement = screen.getByText(/Commits Component/i);
    expect(headingElement).toBeInTheDocument();
  });
});
