import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import axios from "axios";

vitest.mock("axios");

describe("Login Component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  afterEach(() => {
    axios.post.mockClear();
  });

  it("should display loading indicator when loading", async () => {
    axios.post.mockImplementation(() => new Promise(() => {}));

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const signInButton = screen.getByRole("button", { name: /Sign in/i });

    await userEvent.type(emailInput, "luka@gmail.com");
    await userEvent.type(passwordInput, "password");

    await userEvent.click(signInButton);

    await waitFor(
      () => {
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });

  it("should display error message when there's an error", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const signInButton = screen.getByRole("button", { name: /Sign in/i });

    await userEvent.type(emailInput, "luka@gmail.com");
    await userEvent.type(passwordInput, "password");

    await userEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText("An error occurred. Please try again.")
      ).toBeInTheDocument();
    });
  });

  //   it("should have email and password input fields", () => {
  //     const { getByLabelText } = render(<Login />);

  //     expect(getByLabelText(/Email address/i)).toBeInTheDocument();
  //     expect(getByLabelText(/Password/i)).toBeInTheDocument();
  //   });

  //   it("should have a submit button", () => {
  //     const { getByRole } = render(<Login />);

  //     expect(getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  //   });
});
