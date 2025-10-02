import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("Register Component", () => {
  beforeEach(() => {
    render(<Register />);
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
