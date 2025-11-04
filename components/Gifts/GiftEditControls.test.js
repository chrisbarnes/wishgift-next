import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GiftEditControls from './GiftEditControls';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

// Mock IconButton
vi.mock('../Forms/IconButton', () => ({
  default: ({ icon, clickHandler, accessibleText, text }) => (
    <button onClick={clickHandler} data-testid={`icon-button-${icon}`}>
      {text || accessibleText}
    </button>
  ),
}));

// Mock MarkPurchasedButton
vi.mock('./MarkPurchasedButton', () => ({
  default: ({ onChange }) => (
    <div data-testid="mark-purchased-button">
      <input type="checkbox" onChange={onChange} />
    </div>
  ),
}));

import { useRouter } from 'next/router';

describe('GiftEditControls', () => {
  const mockProps = {
    isOwner: true,
    handleEditClick: vi.fn(),
    handleDeleteClick: vi.fn(),
    handleImageClick: vi.fn(),
    isPurchased: false,
    purchasedBy: null,
    updated: vi.fn(),
    giftId: '1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      query: { groupId: 'group-123' },
    });
    global.fetch = vi.fn();
  });

  it('renders edit button when user is owner', () => {
    render(<GiftEditControls {...mockProps} />);
    expect(screen.getByTestId('icon-button-Edit')).toBeInTheDocument();
  });

  it('renders delete button when user is owner', () => {
    render(<GiftEditControls {...mockProps} />);
    expect(screen.getByTestId('icon-button-Trash')).toBeInTheDocument();
  });

  it('calls handleEditClick when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<GiftEditControls {...mockProps} />);

    await user.click(screen.getByTestId('icon-button-Edit'));
    expect(mockProps.handleEditClick).toHaveBeenCalledTimes(1);
  });

  it('calls handleDeleteClick when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<GiftEditControls {...mockProps} />);

    await user.click(screen.getByTestId('icon-button-Trash'));
    expect(mockProps.handleDeleteClick).toHaveBeenCalledTimes(1);
  });

  it('does not render owner buttons when user is not owner', () => {
    render(<GiftEditControls {...mockProps} isOwner={false} />);
    expect(screen.queryByTestId('icon-button-Edit')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-button-Trash')).not.toBeInTheDocument();
  });

  it('renders MarkPurchasedButton when user is not owner', () => {
    render(<GiftEditControls {...mockProps} isOwner={false} />);
    expect(screen.getByTestId('mark-purchased-button')).toBeInTheDocument();
  });

  it('does not render MarkPurchasedButton when user is owner', () => {
    render(<GiftEditControls {...mockProps} isOwner={true} />);
    expect(screen.queryByTestId('mark-purchased-button')).not.toBeInTheDocument();
  });
});
