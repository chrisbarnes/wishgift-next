import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label label="Username" id="username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("associates label with input using htmlFor", () => {
    render(<Label label="Email" id="email-input" />);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("applies correct CSS classes", () => {
    render(<Label label="Password" id="password" />);
    const label = screen.getByText("Password");
    // shadcn label has different default classes
    expect(label).toHaveClass("text-sm", "font-medium", "mb-2");
  });
});
