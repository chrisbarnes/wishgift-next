import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GiftCardView from "./GiftCardView";

// Mock the GiftEditControls component
vi.mock("./GiftEditControls", () => ({
  default: () => <div data-testid="gift-edit-controls">Edit Controls</div>,
}));

// Mock the Icons component
vi.mock("../Icons", () => ({
  default: {
    Tag: ({ size }) => <span data-testid="tag-icon">{size}</span>,
  },
}));

describe("GiftCardView", () => {
  const mockProps = {
    id: "1",
    name: "Test Gift",
    description: "Test Description",
    url: "https://example.com",
    imageUrl: "",
    isPurchased: false,
    purchasedBy: null,
    giftFor: { name: "John" },
    price: "25",
    isOwner: false,
    handleEditGiftClick: vi.fn(),
    handleDeleteGiftClick: vi.fn(),
    handleAddImageClick: vi.fn(),
    updated: vi.fn(),
  };

  it("renders gift name", () => {
    render(<GiftCardView {...mockProps} />);
    expect(screen.getByText("Test Gift")).toBeInTheDocument();
  });

  it("renders gift description when not purchased", () => {
    render(<GiftCardView {...mockProps} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("does not render description when purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("renders price when provided and not purchased", () => {
    render(<GiftCardView {...mockProps} />);
    expect(screen.getByText("$25")).toBeInTheDocument();
  });

  it("does not render price when purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} />);
    expect(screen.queryByText("$25")).not.toBeInTheDocument();
  });

  it("renders gift recipient name", () => {
    render(<GiftCardView {...mockProps} />);
    const nameElements = screen.getAllByText("John");
    expect(nameElements.length).toBeGreaterThan(0);
  });

  it("renders URL as a link when provided", () => {
    render(<GiftCardView {...mockProps} />);
    const link = screen.getByRole("link", { name: /Test Gift/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("renders Tag icon when no image URL is provided and not purchased", () => {
    render(<GiftCardView {...mockProps} imageUrl="" />);
    expect(screen.getByTestId("tag-icon")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided and not purchased", () => {
    render(
      <GiftCardView {...mockProps} imageUrl="https://example.com/image.jpg" />,
    );
    const img = screen.getByRole("img", { name: "Test Gift" });
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("applies purchased styling when gift is purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} />);
    const heading = screen.getByText("Test Gift").closest("h3");
    expect(heading).toHaveClass("font-thin");
  });

  it("applies non-purchased styling when gift is not purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={false} />);
    const heading = screen.getByText("Test Gift").closest("h3");
    expect(heading).toHaveClass("font-bold");
  });

  it("renders GiftEditControls component", () => {
    render(<GiftCardView {...mockProps} />);
    expect(screen.getByTestId("gift-edit-controls")).toBeInTheDocument();
  });
});
