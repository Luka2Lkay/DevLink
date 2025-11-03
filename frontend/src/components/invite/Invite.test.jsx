import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Invite from "./invite";

describe("Invite", () => {

    it("should render invite text", () => {

        render(<MemoryRouter>
            <Invite />
        </MemoryRouter>)


        expect(screen.getByText(/Invite a contributor/i)).toBeInTheDocument()
    })
})