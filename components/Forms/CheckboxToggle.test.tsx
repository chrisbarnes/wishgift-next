import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxToggle from "./CheckboxToggle";

describe("CheckboxToggle", () => {
  it("renders with label", () => {
    render(<CheckboxToggle label="Enable notifications" onChange={vi.fn()} />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("renders checkbox input", () => {
    render(<CheckboxToggle label="Toggle" onChange={vi.fn()} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("sets default checked state", () => {
    render(
      <CheckboxToggle label="Toggle" isChecked={true} onChange={vi.fn()} />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("sets default unchecked state", () => {
    render(
      <CheckboxToggle label="Toggle" isChecked={false} onChange={vi.fn()} />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange handler when toggled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<CheckboxToggle label="Toggle" onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies correct CSS classes to label", () => {
    render(<CheckboxToggle label="Toggle" onChange={vi.fn()} />);
    const label = screen.getByText("Toggle").closest("label");
    expect(label).toHaveClass(
      "relative",
      "flex",
      "justify-between",
      "items-center",
    );
  });
});
