import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AddImage from './AddImage';

// Mock ImageSelector
vi.mock('./ImageSelector', () => ({
  default: () => <div data-testid="image-selector">Image Selector</div>,
}));

describe('AddImage', () => {
  const mockProps = {
    url: 'https://example.com',
    handleAddImageToggle: vi.fn(),
    giftId: 'gift-123',
    addedCallback: vi.fn(),
    imageUrl: 'https://example.com/gift-image.jpg',
    name: 'Test Gift',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders URL input form initially', () => {
    render(<AddImage {...mockProps} />);
    expect(screen.getByText('Enter a URL to search for images')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
  });

  it('renders Find and Cancel buttons', () => {
    render(<AddImage {...mockProps} />);
    expect(screen.getByRole('button', { name: /Find/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('applies correct heading styles', () => {
    render(<AddImage {...mockProps} />);
    const heading = screen.getByText('Enter a URL to search for images');
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-slate-400', 'mb-3');
  });
});
