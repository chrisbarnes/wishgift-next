import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupsList from "./GroupsList";

// Mock React Query
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

// Mock GroupCard
vi.mock("./GroupCard", () => ({
  default: ({ name }: any) => <div data-testid="group-card">{name}</div>,
}));

import { useQuery } from "@tanstack/react-query";

describe("GroupsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading message when data is not loaded", () => {
    (useQuery as any).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(<GroupsList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    (useQuery as any).mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
    });

    render(<GroupsList />);
    expect(screen.getByText("An error has occurred.")).toBeInTheDocument();
  });

  it("renders group cards when data is loaded", () => {
    const mockGroups = [
      { id: "1", name: "Group 1", description: "Desc 1" },
      { id: "2", name: "Group 2", description: "Desc 2" },
    ];

    (useQuery as any).mockReturnValue({
      data: { data: mockGroups },
      error: undefined,
      isLoading: false,
    });

    render(<GroupsList />);
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });

  it("applies grid layout classes", () => {
    (useQuery as any).mockReturnValue({
      data: { data: [] },
      error: undefined,
      isLoading: false,
    });

    const { container } = render(<GroupsList />);
    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass("grid", "gap-4", "grid-cols-3");
  });

  it("renders no groups when data is empty", () => {
    (useQuery as any).mockReturnValue({
      data: { data: [] },
      error: undefined,
      isLoading: false,
    });

    render(<GroupsList />);
    expect(screen.queryByTestId("group-card")).not.toBeInTheDocument();
  });
});
