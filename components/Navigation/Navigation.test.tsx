import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "./Navigation";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock Logo component
vi.mock("./Logo", () => ({
  default: () => <span data-testid="logo">Logo</span>,
}));

import { useSession, signIn, signOut } from "next-auth/react";

describe("Navigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders WishGift brand text", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navigation />);
    expect(screen.getByText("WishGift")).toBeInTheDocument();
  });

  it("renders Logo component", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navigation />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders Groups link", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navigation />);
    expect(screen.getByText("Groups")).toBeInTheDocument();
  });

  it("renders Sign Up/Sign In button when not authenticated", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navigation />);
    expect(
      screen.getByRole("button", { name: /Sign Up\/Sign In/i }),
    ).toBeInTheDocument();
  });

  it("renders Sign Out button when authenticated", () => {
    (useSession as any).mockReturnValue({
      data: { user: { email: "user@example.com" } },
      status: "authenticated",
    });

    render(<Navigation />);
    expect(
      screen.getByRole("button", { name: /Sign Out/i }),
    ).toBeInTheDocument();
  });

  it("does not render auth buttons when loading", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<Navigation />);
    expect(
      screen.queryByRole("button", { name: /Sign/i }),
    ).not.toBeInTheDocument();
  });

  it("calls signIn when Sign Up/Sign In button is clicked", async () => {
    const user = userEvent.setup();
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navigation />);
    await user.click(screen.getByRole("button", { name: /Sign Up\/Sign In/i }));
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("calls signOut when Sign Out button is clicked", async () => {
    const user = userEvent.setup();
    (useSession as any).mockReturnValue({
      data: { user: { email: "user@example.com" } },
      status: "authenticated",
    });

    render(<Navigation />);
    await user.click(screen.getByRole("button", { name: /Sign Out/i }));
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("applies correct CSS classes to nav", () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    const { container } = render(<Navigation />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("bg-black");
  });
});
