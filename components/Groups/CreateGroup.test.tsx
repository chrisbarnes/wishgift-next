import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreateGroup from './CreateGroup';

describe('CreateGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders heading', () => {
    render(<CreateGroup />);
    expect(screen.getByText('Create a Group')).toBeInTheDocument();
  });

  it('renders Name field', () => {
    render(<CreateGroup />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders Description field', () => {
    render(<CreateGroup />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders Submit button', () => {
    render(<CreateGroup />);
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    const { container } = render(<CreateGroup />);
    const card = container.firstChild;
    expect(card).toHaveClass('px-6', 'py-4', 'shadow-md', 'rounded-md', 'mb-8', 'bg-white');
  });

  it('applies correct heading styles', () => {
    render(<CreateGroup />);
    const heading = screen.getByText('Create a Group');
    expect(heading).toHaveClass('mb-4', 'font-bold', 'text-lg');
  });
});
