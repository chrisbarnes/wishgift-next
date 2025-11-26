import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LargeHero from "./LargeHero";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe("LargeHero", () => {
  const mockProps = {
    heading: "Welcome to WishGift",
    description: "Share your wish list with friends and family",
    backgroundImage: "/hero-bg.jpg",
  };

  it("renders heading", () => {
    render(<LargeHero {...mockProps} />);
    expect(screen.getByText("Welcome to WishGift")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<LargeHero {...mockProps} />);
    expect(
      screen.getByText("Share your wish list with friends and family")
    ).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<LargeHero {...mockProps} description={undefined} />);
    expect(screen.queryByText(/Share your wish list/)).not.toBeInTheDocument();
  });

  it("renders link when link object is provided", () => {
    const link = { url: "/get-started", text: "Get Started" };
    render(<LargeHero {...mockProps} link={link} />);

    const linkElement = screen.getByRole("link", { name: "Get Started" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/get-started");
  });

  it("does not render link when link is not provided", () => {
    render(<LargeHero {...mockProps} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders background image", () => {
    const { container } = render(<LargeHero {...mockProps} />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/hero-bg.jpg");
  });

  it("applies correct heading styles", () => {
    render(<LargeHero {...mockProps} />);
    const heading = screen.getByText("Welcome to WishGift");
    expect(heading).toHaveClass("relative", "z-10", "font-bold", "text-6xl");
  });

  it("applies correct container styles", () => {
    const { container } = render(<LargeHero {...mockProps} />);
    const heroDiv = container.firstChild;
    expect(heroDiv).toHaveClass(
      "relative",
      "flex",
      "flex-col",
      "justify-center",
      "items-center"
    );
  });
});
