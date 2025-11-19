import { render, screen } from "@testing-library/react";
import Notifications from "./Notifications";
import { Provider } from "react-redux";
import store from "../../state/store.js";
import { MemoryRouter } from "react-router-dom";

describe("Notifications", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Notifications />
        </Provider>
      </MemoryRouter>
    );
  });
  it("should render the icon button", () => {
    expect(screen.getByTestId("icon-button")).toBeInTheDocument();
  });
});
