import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Navigation from "./Navigation"

describe("Navigation", () => {

    it("should render the Logout link", () => {
        render(<MemoryRouter>
            <Navigation />
        </MemoryRouter>)

        expect(screen.getByText("Logout")).toBeInTheDocument();
    })
})