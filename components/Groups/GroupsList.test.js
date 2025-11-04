import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GroupsList from './GroupsList';

// Mock SWR
vi.mock('swr', () => ({
  default: vi.fn(),
}));

// Mock GroupCard
vi.mock('./GroupCard', () => ({
  default: ({ name }) => <div data-testid="group-card">{name}</div>,
}));

import useSWR from 'swr';

describe('GroupsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading message when data is not loaded', () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
    });

    render(<GroupsList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch'),
    });

    render(<GroupsList />);
    expect(screen.getByText('An error has occurred.')).toBeInTheDocument();
  });

  it('renders group cards when data is loaded', () => {
    const mockGroups = [
      { id: '1', name: 'Group 1', description: 'Desc 1' },
      { id: '2', name: 'Group 2', description: 'Desc 2' },
    ];

    useSWR.mockReturnValue({
      data: { data: mockGroups },
      error: undefined,
    });

    render(<GroupsList />);
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
  });

  it('applies grid layout classes', () => {
    useSWR.mockReturnValue({
      data: { data: [] },
      error: undefined,
    });

    const { container } = render(<GroupsList />);
    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('grid', 'gap-4', 'grid-cols-3');
  });

  it('renders no groups when data is empty', () => {
    useSWR.mockReturnValue({
      data: { data: [] },
      error: undefined,
    });

    render(<GroupsList />);
    expect(screen.queryByTestId('group-card')).not.toBeInTheDocument();
  });
});
