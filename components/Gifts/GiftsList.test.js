import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GiftsList from './GiftsList';

// Mock SWR
vi.mock('swr', () => ({
  default: vi.fn(),
}));

// Mock child components
vi.mock('./GiftCard', () => ({
  default: ({ name }) => <div data-testid="gift-card">{name}</div>,
}));

vi.mock('./CreateGift', () => ({
  default: () => <div data-testid="create-gift">Create Gift</div>,
}));

vi.mock('./GiftsCount', () => ({
  default: ({ filteredGifts }) => <div data-testid="gifts-count">{filteredGifts}</div>,
}));

vi.mock('../Search/SearchForm', () => ({
  default: () => <div data-testid="search-form">Search Form</div>,
}));

import useSWR from 'swr';

describe('GiftsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading message when data is not loaded', () => {
    useSWR.mockReturnValue({
      data: undefined,
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText('Loading gifts...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    useSWR.mockReturnValue({
      data: undefined,
      mutate: vi.fn(),
      error: new Error('Failed to fetch'),
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText('Sorry. There was an error retrieving the gifts.')).toBeInTheDocument();
  });

  it('renders CreateGift component', () => {
    useSWR.mockReturnValue({
      data: { gifts: [] },
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByTestId('create-gift')).toBeInTheDocument();
  });

  it('renders gift cards when data is loaded', () => {
    const mockGifts = [
      { id: '1', name: 'Gift 1', bgColor: 'bg-blue-100' },
      { id: '2', name: 'Gift 2', bgColor: 'bg-red-100' },
    ];

    useSWR.mockReturnValue({
      data: { gifts: mockGifts },
      mutate: vi.fn(),
      error: undefined,
    });

    render(<GiftsList groupId="group-123" />);
    expect(screen.getByText('Gift 1')).toBeInTheDocument();
    expect(screen.getByText('Gift 2')).toBeInTheDocument();
  });

  it('applies grid layout classes', () => {
    useSWR.mockReturnValue({
      data: { gifts: [] },
      mutate: vi.fn(),
      error: undefined,
    });

    const { container } = render(<GiftsList groupId="group-123" />);
    const gridContainer = container.querySelector('.md\\:grid');
    expect(gridContainer).toHaveClass('gap-4', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });
});
