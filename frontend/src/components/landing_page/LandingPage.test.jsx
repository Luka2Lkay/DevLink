import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { MemoryRouter } from "react-router-dom";

describe("LandingPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
  });

  it("contains the main heading", () => {
    expect(
      screen.getByText(
        "Build Your Portfolio. Grow Your Network. Land Your First Dev Job."
      )
    ).toBeInTheDocument();
  });

  it("contains the key features section", () => {
    expect(screen.getByText("Key Features")).toBeInTheDocument();
  });

  it("contains the start building button", () => {
    expect(screen.getByText("Start Building Your Future")).toBeInTheDocument();
  });

  it("contains the footer with current year", () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© Lukhanyo Matshebelele ${currentYear}`)
    ).toBeInTheDocument();
  });
});
