import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import axios from "axios";

vitest.mock("axios");

describe("Register Component", () => {
  beforeEach(() => {
    render(<Register />);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should load and display the loading spinner when submitting", async () => {
    axios.post.mockImplementation(() => new Promise(() => {}));

    const nameInput = screen.getByTestId("name-id");
    const emailInput = screen.getByTestId("email-id");
    const passwordInput = screen.getByTestId("password-id");
    const confirmPasswordInput = screen.getByTestId("confirm-password-id");
    const githubUsernameInput = screen.getByTestId("github-username-id");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    await userEvent.type(nameInput, "Luka");
    await userEvent.type(emailInput, "luka@gmail.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.type(confirmPasswordInput, "password");
    await userEvent.type(githubUsernameInput, "luka-git");

    await userEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  it("should display error message when there's an error", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));

    const nameInput = screen.getByTestId("name-id");
    const emailInput = screen.getByTestId("email-id");
    const passwordInput = screen.getByTestId("password-id");
    const confirmPasswordInput = screen.getByTestId("confirm-password-id");
    const githubUsernameInput = screen.getByTestId("github-username-id");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    await userEvent.type(nameInput, "Luka");
    await userEvent.type(emailInput, "luka@mail.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.type(confirmPasswordInput, "password");
    await userEvent.type(githubUsernameInput, "luka-git");

    await userEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText("An error occurred. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("has all input fields", () => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Github Username")).toBeInTheDocument();
  });

  it("has a submit button", () => {
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("has a link to sign in", () => {
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });
});
