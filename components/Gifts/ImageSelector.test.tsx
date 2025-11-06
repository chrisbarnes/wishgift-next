import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageSelector from "./ImageSelector";

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

import { useRouter } from "next/router";

describe("ImageSelector", () => {
  const mockProps = {
    images: ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
    handleAddImageToggle: vi.fn(),
    giftId: "gift-123",
    addedCallback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      query: { groupId: "group-123" },
    });
    global.fetch = vi.fn();
  });

  it("returns null when images prop is not provided", () => {
    const { container } = render(
      <ImageSelector {...mockProps} images={null as any} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders images when provided", () => {
    render(<ImageSelector {...mockProps} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("renders Cancel and Save buttons", () => {
    render(<ImageSelector {...mockProps} />);
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("calls handleAddImageToggle when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<ImageSelector {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockProps.handleAddImageToggle).toHaveBeenCalledTimes(1);
  });

  it("shows error message when Save is clicked without selecting an image", async () => {
    const user = userEvent.setup();
    render(<ImageSelector {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Save/i }));
    expect(
      screen.getByText("Please select an image first."),
    ).toBeInTheDocument();
  });

  it("applies grid layout to images container", () => {
    const { container } = render(<ImageSelector {...mockProps} />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-4", "gap-1");
  });
});
