import { render } from "@testing-library/react"
import LandingPage from "./LandingPage"
import { it } from "vitest"

describe("LandingPage", () => {
    it("renders without crashing", () => {
        render(<LandingPage />)
    })

    it("contains the main heading", () => {
        const { getByText } = render(<LandingPage />)
        expect(getByText("Build Your Portfolio. Grow Your Network. Land Your First Dev Job.")).toBeInTheDocument()
    })

    it("contains the key features section", () => {
        const { getByText } = render(<LandingPage />)
        expect(getByText("Key Features")).toBeInTheDocument()
    })

    it("contains the start building button", () => {
        const { getByText } = render(<LandingPage />)
        expect(getByText("Start Building Your Future")).toBeInTheDocument()
    })

    it("contains the footer with current year", () => {
        const { getByText } = render(<LandingPage />)
        const currentYear = new Date().getFullYear()
        expect(getByText(`© Lukhanyo Matshebelele ${currentYear}`)).toBeInTheDocument()
    })
})