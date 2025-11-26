import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupHeader from "./GroupHeader";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// Mock dependencies
vi.mock("../../lib/accentColors", () => ({
  borderColors: [
    "border-blue-500",
    "border-red-500",
    "border-green-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
  ],
}));

vi.mock("../../lib/randomInt", () => ({
  getRandomInt: vi.fn(() => 0),
}));

describe("GroupHeader", () => {
  const mockProps = {
    name: "Test Group",
    description: "Test Description",
    isOwner: true,
    id: "group-123",
    editedCallback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
    global.fetch = vi.fn();
  });

  it("renders group name", () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByText("Test Group")).toBeInTheDocument();
  });

  it("renders group description", () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders Edit button when user is owner", () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
  });

  it("does not render Edit button when user is not owner", () => {
    render(<GroupHeader {...mockProps} isOwner={false} />);
    expect(
      screen.queryByRole("button", { name: /Edit/i })
    ).not.toBeInTheDocument();
  });

  it("shows edit form when Edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Edit/i }));

    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("hides group name and description when editing", async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Edit/i }));

    // The name should still appear in the form input, but not as a heading
    expect(
      screen.queryByRole("heading", { name: "Test Group" })
    ).not.toBeInTheDocument();
  });

  it("shows form fields when editing", async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /Edit/i }));

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("applies random border color class", () => {
    const { container } = render(<GroupHeader {...mockProps} />);
    const header = container.firstChild;
    expect(header).toHaveClass("border-blue-500");
  });

  it("applies correct heading styles", () => {
    render(<GroupHeader {...mockProps} />);
    const heading = screen.getByText("Test Group");
    expect(heading).toHaveClass("mb-2", "text-4xl", "font-extrabold");
  });

  describe("Delete functionality", () => {
    it("renders Delete button when user is owner", () => {
      render(<GroupHeader {...mockProps} />);
      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      expect(deleteButtons[0]).toBeInTheDocument();
    });

    it("does not render Delete button when user is not owner", () => {
      render(<GroupHeader {...mockProps} isOwner={false} />);
      expect(
        screen.queryByRole("button", { name: /Delete/i })
      ).not.toBeInTheDocument();
    });

    it("shows confirmation dialog when Delete button is clicked", async () => {
      const user = userEvent.setup();
      render(<GroupHeader {...mockProps} />);

      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      await user.click(deleteButtons[0]);

      expect(screen.getByText("Are you sure?")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Cancel/i })
      ).toBeInTheDocument();
    });

    it("hides confirmation dialog when Cancel is clicked", async () => {
      const user = userEvent.setup();
      render(<GroupHeader {...mockProps} />);

      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      await user.click(deleteButtons[0]);

      expect(screen.getByText("Are you sure?")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /Cancel/i }));

      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });

    it("calls delete API and redirects on successful deletion", async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { message: "Success" } }),
      });

      render(<GroupHeader {...mockProps} />);

      // Click first delete button to show confirmation
      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      await user.click(deleteButtons[0]);

      // Click confirm delete button
      const confirmDeleteButtons = screen.getAllByRole("button", {
        name: /Delete/i,
      });
      const confirmButton = confirmDeleteButtons.find((btn) =>
        btn.className.includes("bg-destructive")
      );
      await user.click(confirmButton!);

      // Wait for fetch to be called
      await vi.waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/groups/delete", {
          method: "DELETE",
          body: JSON.stringify({ groupId: "group-123" }),
        });
      });

      // Wait for redirect
      await vi.waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/groups");
      });
    });

    it("shows error alert when deletion fails", async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Failed to delete" }),
      });

      render(<GroupHeader {...mockProps} />);

      // Click first delete button to show confirmation
      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      await user.click(deleteButtons[0]);

      // Click confirm delete button
      const confirmDeleteButtons = screen.getAllByRole("button", {
        name: /Delete/i,
      });
      const confirmButton = confirmDeleteButtons.find((btn) =>
        btn.className.includes("bg-destructive")
      );
      await user.click(confirmButton!);

      await vi.waitFor(
        () => {
          expect(alertSpy).toHaveBeenCalledWith(
            "Failed to delete group. Please try again."
          );
        },
        { timeout: 2000 }
      );

      alertSpy.mockRestore();
    });

    it("shows loading state during deletion", async () => {
      const user = userEvent.setup();

      global.fetch = vi.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ data: { message: "Success" } }),
                }),
              500
            )
          )
      );

      render(<GroupHeader {...mockProps} />);

      // Click first delete button to show confirmation
      const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
      await user.click(deleteButtons[0]);

      // Click confirm delete button
      const confirmDeleteButtons = screen.getAllByRole("button", {
        name: /Delete/i,
      });
      const confirmButton = confirmDeleteButtons.find((btn) =>
        btn.className.includes("bg-destructive")
      );

      // Click and immediately check for loading state
      const clickPromise = user.click(confirmButton!);

      // Wait for the button to be disabled (loading state)
      await vi.waitFor(
        () => {
          expect(confirmButton).toBeDisabled();
        },
        { timeout: 1000 }
      );

      await clickPromise;
    });
  });
});
