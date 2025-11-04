import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GiftCard from './GiftCard';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

// Mock child components
vi.mock('./AddImage', () => ({
  default: () => <div data-testid="add-image">Add Image</div>,
}));

vi.mock('./GiftCardDelete', () => ({
  default: () => <div data-testid="gift-card-delete">Delete Gift</div>,
}));

vi.mock('./GiftCardEdit', () => ({
  default: () => <div data-testid="gift-card-edit">Edit Gift</div>,
}));

vi.mock('./GiftCardView', () => ({
  default: ({ handleEditGiftClick, handleDeleteGiftClick, handleAddImageClick }) => (
    <div data-testid="gift-card-view">
      <button onClick={handleEditGiftClick}>Edit</button>
      <button onClick={handleDeleteGiftClick}>Delete</button>
      <button onClick={handleAddImageClick}>Add Image</button>
    </div>
  ),
}));

import { useSession } from 'next-auth/react';

describe('GiftCard', () => {
  const mockProps = {
    id: '1',
    name: 'Test Gift',
    owner: 'owner@example.com',
    isPurchased: false,
    bgColor: 'bg-blue-100',
    updated: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders GiftCardView by default', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'user@example.com' } },
      status: 'authenticated',
    });

    render(<GiftCard {...mockProps} />);
    expect(screen.getByTestId('gift-card-view')).toBeInTheDocument();
  });

  it('shows GiftCardEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    useSession.mockReturnValue({
      data: { user: { email: 'owner@example.com' } },
      status: 'authenticated',
    });

    render(<GiftCard {...mockProps} />);
    await user.click(screen.getByText('Edit'));

    expect(screen.getByTestId('gift-card-edit')).toBeInTheDocument();
    expect(screen.queryByTestId('gift-card-view')).not.toBeInTheDocument();
  });

  it('shows GiftCardDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    useSession.mockReturnValue({
      data: { user: { email: 'owner@example.com' } },
      status: 'authenticated',
    });

    render(<GiftCard {...mockProps} />);
    await user.click(screen.getByText('Delete'));

    expect(screen.getByTestId('gift-card-delete')).toBeInTheDocument();
    expect(screen.queryByTestId('gift-card-view')).not.toBeInTheDocument();
  });

  it('shows AddImage when add image button is clicked', async () => {
    const user = userEvent.setup();
    useSession.mockReturnValue({
      data: { user: { email: 'owner@example.com' } },
      status: 'authenticated',
    });

    render(<GiftCard {...mockProps} />);
    await user.click(screen.getByText('Add Image'));

    expect(screen.getByTestId('add-image')).toBeInTheDocument();
    expect(screen.queryByTestId('gift-card-view')).not.toBeInTheDocument();
  });

  it('applies purchased background color when purchased by someone else', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'user@example.com' } },
      status: 'authenticated',
    });

    const { container } = render(
      <GiftCard {...mockProps} isPurchased={true} bgColor="bg-red-100" />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('bg-red-100');
  });

  it('applies white background when user is owner', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'owner@example.com' } },
      status: 'authenticated',
    });

    const { container } = render(
      <GiftCard {...mockProps} isPurchased={true} bgColor="bg-red-100" />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('bg-white');
  });
});
