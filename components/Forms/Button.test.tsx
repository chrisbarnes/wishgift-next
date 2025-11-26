import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies the correct type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies custom className along with default classes", () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
    // shadcn button uses bg-primary and text-primary-foreground instead of specific colors
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-primary-foreground");
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes through additional props", () => {
    render(
      <Button disabled data-testid="test-button">
        Disabled
      </Button>
    );
    const button = screen.getByTestId("test-button");
    expect(button).toBeDisabled();
  });
});
