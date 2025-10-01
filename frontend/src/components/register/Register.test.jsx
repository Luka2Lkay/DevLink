import { render } from "@testing-library/react";
import Register from "./Register";

describe("Register Component", () => {
    it("renders the register form", () => {
        render(<Register />);
    });

    it("has all input fields", () => {
        const { getByLabelText } = render(<Register />);
        expect(getByLabelText("Name")).toBeInTheDocument();
        expect(getByLabelText("Email address")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
        expect(getByLabelText("Confirm Password")).toBeInTheDocument();
        expect(getByLabelText("Github Username")).toBeInTheDocument();
    });

    it("has a submit button", () => {
        const { getByRole } = render(<Register />);
        expect(getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    it("has a link to sign in", () => {
        const { getByText } = render(<Register />);
        expect(getByText(/already have an account\?/i)).toBeInTheDocument();
    });

});