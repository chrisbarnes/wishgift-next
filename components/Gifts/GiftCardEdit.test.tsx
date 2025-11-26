import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GiftCardEdit from "./GiftCardEdit";

describe("GiftCardEdit", () => {
  const mockGift = {
    id: "1",
    name: "Test Gift",
    description: "Test Description",
    url: "https://example.com",
    imageUrl: "https://example.com/image.jpg",
    giftFor: { name: "John" },
    price: "25",
  };

  const mockProps = {
    handleEditGiftToggle: vi.fn(),
    gift: mockGift,
    editedCallback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("renders form with all fields", () => {
    render(<GiftCardEdit {...mockProps} />);

    expect(screen.getByText("Edit Gift")).toBeInTheDocument();
    expect(screen.getByText("Gift Name *")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Product URL")).toBeInTheDocument();
    expect(screen.getByText("Gift For")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  it("renders Save Changes and Cancel buttons", () => {
    render(<GiftCardEdit {...mockProps} />);

    expect(
      screen.getByRole("button", { name: /Save Changes/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("calls handleEditGiftToggle when Cancel is clicked", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();
    render(<GiftCardEdit {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockProps.handleEditGiftToggle).toHaveBeenCalledTimes(1);
  });

  it("renders gift image", () => {
    render(<GiftCardEdit {...mockProps} />);
    const image = screen.getByAltText("Test Gift");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("initializes form fields with gift data", () => {
    render(<GiftCardEdit {...mockProps} />);

    expect(
      screen.getByPlaceholderText("e.g., Keyboard Wrist Rest")
    ).toHaveValue("Test Gift");
    expect(screen.getByPlaceholderText("$22")).toHaveValue("25");
    expect(screen.getByPlaceholderText("https://...")).toHaveValue(
      "https://example.com"
    );
    expect(screen.getByPlaceholderText("Sarah")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Add a description...")).toHaveValue(
      "Test Description"
    );
  });
});
