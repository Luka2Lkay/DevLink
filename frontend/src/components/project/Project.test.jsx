import { render, screen } from "@testing-library/react"
import Project from "./Project"
import { MemoryRouter } from "react-router-dom"

describe("Project component", () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Project
                    project={{
                    title:"Test Project",
                    description:"This is a test project",
                    owner:{_id: "Test id", name: "Test Owner"},
                    collaborators:[{ name: "Luka" }]}}/>
            </MemoryRouter>
        )
    })

    it("renders the project title", () => {
        expect(screen.getByText("Test Project")).toBeInTheDocument();
    })

    it("renders the project description", () => {
        expect(screen.getByText("This is a test project")).toBeInTheDocument();
    })

    it("renders the project owner", () => {
        expect(screen.getByText("Test Owner")).toBeInTheDocument();
    })

    it("renders the project collaborators", () => {
        expect(screen.getByText("Luka")).toBeInTheDocument();
    })
})