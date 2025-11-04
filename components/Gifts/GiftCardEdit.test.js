import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import GiftCardEdit from './GiftCardEdit';

describe('GiftCardEdit', () => {
  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    url: 'https://example.com',
    giftFor: { name: 'John' },
    price: '25',
  };

  const mockProps = {
    handleEditGiftToggle: vi.fn(),
    gift: mockGift,
    editedCallback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders form with all fields', () => {
    render(<GiftCardEdit {...mockProps} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('For (if not for you)')).toBeInTheDocument();
    expect(screen.getByText('Price ($)')).toBeInTheDocument();
  });

  it('renders Submit and Cancel buttons', () => {
    render(<GiftCardEdit {...mockProps} />);

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('calls handleEditGiftToggle when Cancel is clicked', async () => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(<GiftCardEdit {...mockProps} />);

    await user.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockProps.handleEditGiftToggle).toHaveBeenCalledTimes(1);
  });

  it('renders hidden input for giftId', () => {
    const { container } = render(<GiftCardEdit {...mockProps} />);
    const hiddenInput = container.querySelector('input[name="giftId"]');
    expect(hiddenInput).toHaveValue('1');
  });
});
