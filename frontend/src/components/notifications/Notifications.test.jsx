import {render, screen} from "@testing-library/react"
import Notifications from "./Notifications"

describe("Notifications", () => {


    beforeEach(() => {
        render(<Notifications/>)
    })
    it("should render the icon button", () => {

        expect(screen.getByTestId("icon-button")).toBeInTheDocument()
    })
})