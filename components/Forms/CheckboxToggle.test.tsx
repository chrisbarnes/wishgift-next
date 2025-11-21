import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxToggle from "./CheckboxToggle";

describe("CheckboxToggle", () => {
  it("renders with label", () => {
    render(<CheckboxToggle label="Enable notifications" onChange={vi.fn()} />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("renders switch input", () => {
    render(<CheckboxToggle label="Toggle" onChange={vi.fn()} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
  });

  it("sets default checked state", () => {
    render(
      <CheckboxToggle label="Toggle" isChecked={true} onChange={vi.fn()} />,
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  it("sets default unchecked state", () => {
    render(
      <CheckboxToggle label="Toggle" isChecked={false} onChange={vi.fn()} />,
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange handler when toggled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<CheckboxToggle label="Toggle" onChange={handleChange} />);

    const switchElement = screen.getByRole("switch");
    await user.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("applies correct CSS classes to label", () => {
    render(<CheckboxToggle label="Toggle" onChange={vi.fn()} />);
    const label = screen.getByText("Toggle");
    expect(label).toHaveClass("text-xs", "uppercase", "font-bold");
  });
});
