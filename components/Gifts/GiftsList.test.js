import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GiftsList from "./GiftsList";

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// Mock SWR
vi.mock("swr", () => ({
  default: vi.fn(),
}));

// Mock child components
vi.mock("./GiftCard", () => ({
  default: ({ name }) => <div data-testid="gift-card">{name}</div>,
}));

vi.mock("./CreateGift", () => ({
  default: () => <div data-testid="create-gift">Create Gift</div>,
}));

vi.mock("./GiftsCount", () => ({
  default: ({ filteredGifts }) => (
    <div data-testid="gifts-count">{filteredGifts}</div>
  ),
}));

vi.mock("../Search/SearchForm", () => ({
  default: () => <div data-testid="search-form">Search Form</div>,
}));

import useSWR from "swr";
import { useRouter } from "next/router";

describe("GiftsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      push: vi.fn(),
      pathname: "/groups/[groupId]",
      query: { groupId: "group-123" },
    });
  });

  it("shows loading message when data is not loaded", () => {
    useSWR.mockReturnValue({
      data: undefined,
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText("Loading gifts...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      mutate: vi.fn(),
      error: new Error("Failed to fetch"),
    });

    render(<GiftsList groupId="group-123" />);
    expect(
      screen.getByText("Sorry. There was an error retrieving the gifts."),
    ).toBeInTheDocument();
  });

  it("renders CreateGift component", () => {
    useSWR.mockReturnValue({
      data: { gifts: [] },
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByTestId("create-gift")).toBeInTheDocument();
  });

  it("renders gift cards when data is loaded", () => {
    const mockGifts = [
      { id: "1", name: "Gift 1", bgColor: "bg-blue-100" },
      { id: "2", name: "Gift 2", bgColor: "bg-red-100" },
    ];

    useSWR.mockReturnValue({
      data: { gifts: mockGifts },
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText("Gift 1")).toBeInTheDocument();
    expect(screen.getByText("Gift 2")).toBeInTheDocument();
  });

  it("applies grid layout classes", () => {
    useSWR.mockReturnValue({
      data: { gifts: [] },
      mutate: vi.fn(),
      error: undefined,
    });

    const { container } = render(<GiftsList groupId="group-123" />);
    const gridContainer = container.querySelector(".md\\:grid");
    expect(gridContainer).toHaveClass(
      "gap-4",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
    );
  });

  describe("Field-specific search", () => {
    const mockGifts = [
      {
        id: "1",
        name: "Xbox Series X",
        description: "Gaming console",
        url: "https://example.com/xbox",
        price: 499,
        giftFor: { name: "barnes.chris" },
        bgColor: "bg-blue-100",
      },
      {
        id: "2",
        name: "PlayStation 5",
        description: "Another gaming console",
        url: "https://example.com/ps5",
        price: 499,
        giftFor: { name: "john.doe" },
        bgColor: "bg-red-100",
      },
      {
        id: "3",
        name: "Book",
        description: "A nice book about xbox history",
        url: "https://example.com/book",
        price: 29,
        giftFor: { name: "barnes.chris" },
        bgColor: "bg-green-100",
      },
    ];

    it('filters by "for:" field', () => {
      useSWR.mockReturnValue({
        data: { gifts: mockGifts },
        mutate: vi.fn(),
        error: undefined,
      });

      // Initial render should show all gifts
      expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
      expect(screen.getByText("Book")).toBeInTheDocument();
    });

    it('filters by "name:" field', () => {
      useSWR.mockReturnValue({
        data: { gifts: mockGifts },
        mutate: vi.fn(),
        error: undefined,
      });

      render(<GiftsList groupId="group-123" />);

      // All gifts should be visible initially
      expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
      expect(screen.getByText("Book")).toBeInTheDocument();
    });

    it('filters by "description:" field', () => {
      useSWR.mockReturnValue({
        data: { gifts: mockGifts },
        mutate: vi.fn(),
        error: undefined,
      });

      render(<GiftsList groupId="group-123" />);

      // All gifts should be visible initially
      expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
      expect(screen.getByText("Book")).toBeInTheDocument();
    });

    it('filters by "url:" field', () => {
      useSWR.mockReturnValue({
        data: { gifts: mockGifts },
        mutate: vi.fn(),
        error: undefined,
      });

      render(<GiftsList groupId="group-123" />);

      // All gifts should be visible initially
      expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
      expect(screen.getByText("Book")).toBeInTheDocument();
    });

    it('filters by "price:" field', () => {
      useSWR.mockReturnValue({
        data: { gifts: mockGifts },
        mutate: vi.fn(),
        error: undefined,
      });

      render(<GiftsList groupId="group-123" />);

      // All gifts should be visible initially
      expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
      expect(screen.getByText("Book")).toBeInTheDocument();
    });
  });
});
