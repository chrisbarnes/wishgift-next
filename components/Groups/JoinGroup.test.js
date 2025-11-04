import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinGroup from './JoinGroup';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

import { useRouter } from 'next/router';

describe('JoinGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      query: { groupId: 'group-123' },
    });
    global.fetch = vi.fn();
  });

  it('renders heading', () => {
    render(<JoinGroup update={vi.fn()} />);
    expect(screen.getByText('Join This Group')).toBeInTheDocument();
  });

  it('renders Join Group button', () => {
    render(<JoinGroup update={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Join Group/i })).toBeInTheDocument();
  });

  it('renders hidden input with groupId from router query', () => {
    const { container } = render(<JoinGroup update={vi.fn()} />);
    const hiddenInput = container.querySelector('input[name="groupId"]');
    expect(hiddenInput).toHaveValue('group-123');
  });

  it('applies correct CSS classes to container', () => {
    const { container } = render(<JoinGroup update={vi.fn()} />);
    const card = container.firstChild;
    expect(card).toHaveClass('px-6', 'py-4', 'shadow-md', 'rounded-md', 'mb-8');
  });

  it('applies correct heading styles', () => {
    render(<JoinGroup update={vi.fn()} />);
    const heading = screen.getByText('Join This Group');
    expect(heading).toHaveClass('mb-4', 'font-bold', 'text-lg');
  });
});
