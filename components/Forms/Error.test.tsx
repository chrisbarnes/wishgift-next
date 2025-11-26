import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error", () => {
  it("renders error message when error exists for the field", () => {
    const errors = { email: { type: "required" } };
    render(<Error errors={errors} name="email" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders nothing when no error exists for the field", () => {
    const errors = {};
    const { container } = render(<Error errors={errors} name="email" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when error exists for different field", () => {
    const errors = { password: { type: "required" } };
    const { container } = render(<Error errors={errors} name="email" />);
    expect(container.firstChild).toBeNull();
  });

  it("applies correct CSS classes when error is shown", () => {
    const errors = { username: { type: "required" } };
    render(<Error errors={errors} name="username" />);
    const errorSpan = screen.getByText("This field is required");
    expect(errorSpan).toHaveClass("text-sm", "text-red-700");
  });
});
