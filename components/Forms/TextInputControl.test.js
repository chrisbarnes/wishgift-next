import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextInputControl from './TextInputControl';

describe('TextInputControl', () => {
  const mockRegister = vi.fn((id, options) => ({
    name: id,
    onChange: options?.onChange,
  }));

  it('renders TextInput component', () => {
    render(
      <TextInputControl
        id="username"
        placeholder="Enter username"
        register={mockRegister}
        errors={{}}
      />
    );
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('displays error when error exists for field', () => {
    const errors = { email: { type: 'required' } };
    render(
      <TextInputControl
        id="email"
        placeholder="Enter email"
        register={mockRegister}
        errors={errors}
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error when no error exists', () => {
    render(
      <TextInputControl
        id="email"
        placeholder="Enter email"
        register={mockRegister}
        errors={{}}
      />
    );
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('applies horizontal layout classes when horizontal is true', () => {
    const { container } = render(
      <TextInputControl
        id="test"
        placeholder="Test"
        register={mockRegister}
        errors={{}}
        horizontal={true}
      />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'flex-grow');
  });

  it('applies vertical layout classes when horizontal is false', () => {
    const { container } = render(
      <TextInputControl
        id="test"
        placeholder="Test"
        register={mockRegister}
        errors={{}}
        horizontal={false}
      />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('mb-2');
    expect(wrapper).not.toHaveClass('flex');
  });

  it('passes all props to TextInput', () => {
    render(
      <TextInputControl
        id="name"
        label="Full Name"
        placeholder="Enter your name"
        required={true}
        value="John Doe"
        register={mockRegister}
        errors={{}}
      />
    );
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toHaveValue('John Doe');
  });
});
