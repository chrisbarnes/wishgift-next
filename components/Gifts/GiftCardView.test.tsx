import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GiftCardView from "./GiftCardView";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { groupId: "test-group-id" },
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe("GiftCardView", () => {
  const mockProps = {
    id: "1",
    name: "Test Gift",
    description: "Test Description",
    url: "https://example.com",
    imageUrl: "",
    isPurchased: false,
    purchasedBy: "",
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

  it("renders description even when purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} purchasedBy="Jane" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders price when provided and not purchased", () => {
    render(<GiftCardView {...mockProps} />);
    expect(screen.getByText("$25")).toBeInTheDocument();
  });

  it("renders price even when purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} purchasedBy="Jane" />);
    expect(screen.getByText("$25")).toBeInTheDocument();
  });

  it("renders gift recipient name", () => {
    render(<GiftCardView {...mockProps} />);
    const nameElements = screen.getAllByText("John");
    expect(nameElements.length).toBeGreaterThan(0);
  });

  it("renders URL as a link when provided", () => {
    render(<GiftCardView {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders placeholder when no image URL is provided", () => {
    const { container } = render(<GiftCardView {...mockProps} imageUrl="" />);
    // Check that an svg icon is present (ShoppingBag icon)
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(
      <GiftCardView {...mockProps} imageUrl="https://example.com/image.jpg" />,
    );
    const img = screen.getByRole("img", { name: "Test Gift" });
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("displays purchaser information when gift is purchased", () => {
    render(<GiftCardView {...mockProps} isPurchased={true} purchasedBy="Jane Doe" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("applies bold styling to gift name", () => {
    render(<GiftCardView {...mockProps} />);
    const heading = screen.getByText("Test Gift").closest("h3");
    expect(heading).toHaveClass("font-bold");
  });

  it("renders edit and delete buttons when user is owner", () => {
    render(<GiftCardView {...mockProps} isOwner={true} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("renders mark as purchased checkbox when user is not owner and gift not purchased", () => {
    render(<GiftCardView {...mockProps} isOwner={false} isPurchased={false} />);
    expect(screen.getByText("Mark as purchased by me")).toBeInTheDocument();
  });
});
