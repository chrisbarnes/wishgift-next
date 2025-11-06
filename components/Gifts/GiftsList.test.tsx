import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Ensure environment variable is set before any imports
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_IS_GIFT_FILTERING_ENABLED = "true";
});

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
  default: ({ name }: any) => <div data-testid="gift-card">{name}</div>,
}));

vi.mock("./CreateGift", () => ({
  default: () => <div data-testid="create-gift">Create Gift</div>,
}));

vi.mock("./GiftsCount", () => ({
  default: ({ filteredGifts, totalGifts }: any) => (
    <div data-testid="gifts-count">
      {filteredGifts} of {totalGifts}
    </div>
  ),
}));

vi.mock("../Search/SearchForm", () => ({
  default: ({ searchCallback, resetFilters, initialValue }: any) => (
    <div data-testid="search-form">
      <input
        data-testid="search-input"
        placeholder="Search gifts"
        defaultValue={initialValue || ""}
        onChange={(e) => searchCallback({ search: e.target.value })}
      />
      <button data-testid="reset-button" onClick={resetFilters}>
        Reset
      </button>
    </div>
  ),
}));

import useSWR from "swr";
import { useRouter } from "next/router";
import GiftsList from "./GiftsList";

describe("GiftsList", () => {
  const mockPush = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
      pathname: "/groups/[groupId]",
      query: { groupId: "group-123" },
    });
  });

  it("shows loading message when data is not loaded", () => {
    (useSWR as any).mockReturnValue({
      data: undefined,
      mutate: mockMutate,
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText("Loading gifts...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    (useSWR as any).mockReturnValue({
      data: undefined,
      mutate: mockMutate,
      error: new Error("Failed to fetch"),
    });

    render(<GiftsList groupId="group-123" />);
    expect(
      screen.getByText("Sorry. There was an error retrieving the gifts."),
    ).toBeInTheDocument();
  });

  it("renders CreateGift component", () => {
    (useSWR as any).mockReturnValue({
      data: { gifts: [] },
      mutate: mockMutate,
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByTestId("create-gift")).toBeInTheDocument();
  });

  it("renders gift cards when data is loaded", async () => {
    const mockGifts = [
      {
        id: "1",
        name: "Gift 1",
        description: "Description 1",
        url: "http://example.com/1",
        price: "10",
        giftFor: { name: "User 1" },
        bgColor: "bg-blue-100",
      },
      {
        id: "2",
        name: "Gift 2",
        description: "Description 2",
        url: "http://example.com/2",
        price: "20",
        giftFor: { name: "User 2" },
        bgColor: "bg-red-100",
      },
    ];

    (useSWR as any).mockReturnValue({
      data: { gifts: mockGifts },
      mutate: mockMutate,
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);

    await waitFor(() => {
      expect(screen.getByText("Gift 1")).toBeInTheDocument();
      expect(screen.getByText("Gift 2")).toBeInTheDocument();
    });
  });

  it("applies grid layout classes", () => {
    (useSWR as any).mockReturnValue({
      data: { gifts: [] },
      mutate: mockMutate,
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
        price: "499",
        giftFor: { name: "barnes.chris" },
        bgColor: "bg-blue-100",
      },
      {
        id: "2",
        name: "PlayStation 5",
        description: "Another gaming console",
        url: "https://example.com/ps5",
        price: "499",
        giftFor: { name: "john.doe" },
        bgColor: "bg-red-100",
      },
      {
        id: "3",
        name: "Book",
        description: "A nice book about xbox history",
        url: "https://example.com/book",
        price: "29",
        giftFor: { name: "barnes.chris" },
        bgColor: "bg-green-100",
      },
    ];

    beforeEach(() => {
      (useSWR as any).mockReturnValue({
        data: { gifts: mockGifts },
        mutate: mockMutate,
        error: undefined,
      });
    });

    it('filters by "for:" field', async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      // Initially all gifts should be visible
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
        expect(screen.getByText("Book")).toBeInTheDocument();
      });

      // Search for gifts for barnes.chris
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "for:barnes");

      // Only gifts for barnes.chris should be visible
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.getByText("Book")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
      });
    });

    it('filters by "name:" field', async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for gifts with "xbox" in name
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "name:xbox");

      // Only Xbox should be visible (not the Book even though it has xbox in description)
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
        expect(screen.queryByText("Book")).not.toBeInTheDocument();
      });
    });

    it('filters by "description:" field', async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for "gaming" in description
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "description:gaming");

      // Only items with "gaming" in description
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
        expect(screen.queryByText("Book")).not.toBeInTheDocument();
      });
    });

    it('filters by "url:" field', async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for "/ps5" in URL
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "url:ps5");

      // Only PlayStation should be visible
      await waitFor(() => {
        expect(screen.queryByText("Xbox Series X")).not.toBeInTheDocument();
        expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
        expect(screen.queryByText("Book")).not.toBeInTheDocument();
      });
    });

    it('filters by "price:" field', async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for price 29
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "price:29");

      // Only the book with price 29 should be visible
      await waitFor(() => {
        expect(screen.queryByText("Xbox Series X")).not.toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
        expect(screen.getByText("Book")).toBeInTheDocument();
      });
    });

    it("performs general search across multiple fields", async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for "xbox" without field prefix (should search name, description, and giftFor)
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "xbox");

      // Both Xbox and Book should be visible (Book has xbox in description)
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.getByText("Book")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
      });
    });

    it("resets filters when reset button is clicked", async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Apply a filter
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "name:xbox");

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
      });

      // Reset filters
      const resetButton = screen.getByTestId("reset-button");
      await user.click(resetButton);

      // All gifts should be visible again
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
        expect(screen.getByText("Book")).toBeInTheDocument();
      });
    });

    it("updates gifts count when filtering", async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      // Initially should show all 3 gifts
      await waitFor(() => {
        expect(screen.getByTestId("gifts-count")).toHaveTextContent("3 of 3");
      });

      // Filter to show only 2 gifts
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "for:barnes");

      // Should show 2 of 3
      await waitFor(() => {
        expect(screen.getByTestId("gifts-count")).toHaveTextContent("2 of 3");
      });
    });

    it("applies initial search from prop", async () => {
      render(<GiftsList groupId="group-123" initialSearch="name:xbox" />);

      // Only Xbox should be visible on initial render
      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
        expect(screen.queryByText("Book")).not.toBeInTheDocument();
      });
    });

    it("handles empty search results", async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search for something that doesn't exist
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "name:nonexistent");

      // No gifts should be visible
      await waitFor(() => {
        expect(screen.queryByText("Xbox Series X")).not.toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
        expect(screen.queryByText("Book")).not.toBeInTheDocument();
      });

      // Gifts count should show 0 of 3
      expect(screen.getByTestId("gifts-count")).toHaveTextContent("0 of 3");
    });

    it("is case insensitive", async () => {
      const user = userEvent.setup();
      render(<GiftsList groupId="group-123" />);

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
      });

      // Search with different cases
      const searchInput = screen.getByTestId("search-input");
      await user.clear(searchInput);
      await user.type(searchInput, "NAME:XBOX");

      await waitFor(() => {
        expect(screen.getByText("Xbox Series X")).toBeInTheDocument();
        expect(screen.queryByText("PlayStation 5")).not.toBeInTheDocument();
      });
    });
  });

  it("shows search form when there are gifts", async () => {
    const mockGifts = [
      {
        id: "1",
        name: "Gift 1",
        description: "Description 1",
        url: "http://example.com/1",
        price: "10",
        giftFor: { name: "User 1" },
        bgColor: "bg-blue-100",
      },
    ];

    (useSWR as any).mockReturnValue({
      data: { gifts: mockGifts },
      mutate: mockMutate,
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);

    await waitFor(() => {
      expect(screen.getByTestId("search-form")).toBeInTheDocument();
      expect(screen.getByTestId("gifts-count")).toBeInTheDocument();
    });
  });
});
