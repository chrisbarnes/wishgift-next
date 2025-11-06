import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ToggleButton from "./ToggleButton";

describe("ToggleButton", () => {
  it("renders button text", () => {
    render(<ToggleButton text="Show More" />);
    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<ToggleButton text="Toggle" />);
    const button = screen.getByText("Toggle");
    // shadcn button uses semantic color classes
    expect(button).toHaveClass(
      "text-primary-foreground",
      "bg-primary",
      "font-medium",
      "rounded-md",
      "text-sm",
    );
  });

  it("renders with different text", () => {
    render(<ToggleButton text="Expand Content" />);
    expect(screen.getByText("Expand Content")).toBeInTheDocument();
  });
});
