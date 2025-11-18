import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  const mockRegister = vi.fn(
    (id: string, options?: { required?: boolean; onChange?: any }) => ({
      name: id,
      onChange: options?.onChange,
    }),
  ) as any;

  it("renders input element", () => {
    render(
      <TextInput
        id="username"
        placeholder="Enter username"
        register={mockRegister}
      />,
    );
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("renders with label when provided", () => {
    render(
      <TextInput
        id="email"
        label="Email Address"
        placeholder="Enter email"
        register={mockRegister}
      />,
    );
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    render(
      <TextInput
        id="password"
        placeholder="Enter password"
        register={mockRegister}
      />,
    );
    expect(screen.queryByLabelText(/./)).not.toBeInTheDocument();
  });

  it("sets default value", () => {
    render(
      <TextInput
        id="name"
        value="John Doe"
        placeholder="Enter name"
        register={mockRegister}
      />,
    );
    expect(screen.getByPlaceholderText("Enter name")).toHaveValue("John Doe");
  });

  it("calls register with correct parameters", () => {
    const onChange = vi.fn();
    render(
      <TextInput
        id="email"
        required={true}
        onChange={onChange}
        register={mockRegister}
      />,
    );
    expect(mockRegister).toHaveBeenCalledWith("email", {
      required: true,
      onChange,
    });
  });
});
