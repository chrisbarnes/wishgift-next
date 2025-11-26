import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Collapser from "./Collapser";

// Mock Radix UI Collapsible
vi.mock("@radix-ui/react-collapsible", () => ({
  Root: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible-content">{children}</div>
  ),
}));

// Mock ToggleButton
vi.mock("./ToggleButton", () => ({
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));

describe("Collapser", () => {
  it("renders ToggleButton with trigger text", () => {
    render(
      <Collapser triggerText="Show Details">
        <div>Hidden Content</div>
      </Collapser>
    );
    expect(screen.getByText("Show Details")).toBeInTheDocument();
  });

  it("renders children inside collapsible content", () => {
    render(
      <Collapser triggerText="Toggle">
        <div>Test Content</div>
      </Collapser>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct CSS class to root", () => {
    const { container } = render(
      <Collapser triggerText="Toggle">
        <div>Content</div>
      </Collapser>
    );
    const root = container.firstChild;
    expect(root).toHaveClass("mb-8");
  });

  it("renders trigger as a button", () => {
    render(
      <Collapser triggerText="Toggle">
        <div>Content</div>
      </Collapser>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders multiple children correctly", () => {
    render(
      <Collapser triggerText="Toggle">
        <div>First Child</div>
        <div>Second Child</div>
      </Collapser>
    );
    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
  });
});
