import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GiftCardDelete from './GiftCardDelete';

describe('GiftCardDelete', () => {
  const mockProps = {
    handleDeleteGiftToggle: vi.fn(),
    giftId: 'gift-123',
    deletedCallback: vi.fn(),
    imageUrl: 'https://example.com/gift.jpg',
    name: 'Test Gift',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders confirmation message', () => {
    render(<GiftCardDelete {...mockProps} />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders Cancel and Delete buttons', () => {
    render(<GiftCardDelete {...mockProps} />);
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('calls handleDeleteGiftToggle when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<GiftCardDelete {...mockProps} />);

    await user.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockProps.handleDeleteGiftToggle).toHaveBeenCalledTimes(1);
  });

  it('renders hidden input with correct giftId', () => {
    const { container } = render(<GiftCardDelete {...mockProps} />);
    const hiddenInput = container.querySelector('input[name="giftId"]');
    expect(hiddenInput).toHaveValue('gift-123');
  });

  it('renders gift image with correct attributes', () => {
    render(<GiftCardDelete {...mockProps} />);
    const image = screen.getByRole('img', { name: 'Test Gift' });
    expect(image).toHaveAttribute('src', 'https://example.com/gift.jpg');
    expect(image).toHaveAttribute('alt', 'Test Gift');
  });

  it('applies correct CSS classes to confirmation message', () => {
    render(<GiftCardDelete {...mockProps} />);
    const message = screen.getByText('Are you sure?');
    expect(message).toHaveClass('text-2xl', 'font-bold', 'text-white', 'text-center', 'mb-6');
  });
});
