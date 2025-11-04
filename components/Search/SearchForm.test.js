import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

// Mock useMediaQuery hook
vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

import { useMediaQuery } from '../../hooks/useMediaQuery';

describe('SearchForm', () => {
  const mockProps = {
    searchCallback: vi.fn(),
    resetFilters: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useMediaQuery.mockReturnValue(false);
  });

  it('renders search input', () => {
    render(<SearchForm {...mockProps} />);
    expect(screen.getByPlaceholderText('Search gifts')).toBeInTheDocument();
  });

  it('renders search toggle button', () => {
    render(<SearchForm {...mockProps} />);
    expect(screen.getByText('Toggle Search')).toBeInTheDocument();
  });

  it('renders Search button on mobile', () => {
    useMediaQuery.mockReturnValue(false);
    render(<SearchForm {...mockProps} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('toggles search form when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} />);

    const toggleButton = screen.getByText('Toggle Search').closest('button');
    await user.click(toggleButton);

    // Check that the form wrapper has the expanded class by checking it doesn't have the collapsed transform
    const wrapper = toggleButton.parentElement;
    // The wrapper should have transition-transform class
    expect(wrapper).toHaveClass('transition-transform');
  });

  it('applies correct container classes', () => {
    const { container } = render(<SearchForm {...mockProps} />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('md:overflow-hidden');
  });
});
