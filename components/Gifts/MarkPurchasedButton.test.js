import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkPurchasedButton from './MarkPurchasedButton';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

// Mock CheckboxToggle
vi.mock('../Forms/CheckboxToggle', () => ({
  default: ({ label, onChange, isChecked }) => (
    <div data-testid="checkbox-toggle">
      <span>{label}</span>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
    </div>
  ),
}));

import { useSession } from 'next-auth/react';

describe('MarkPurchasedButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders checkbox when user is not owner', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'user@example.com' } },
    });

    render(
      <MarkPurchasedButton
        isOwner={false}
        isPurchased={false}
        purchasedBy={null}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText('Purchased?')).toBeInTheDocument();
  });

  it('does not render when user is owner', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'owner@example.com' } },
    });

    const { container } = render(
      <MarkPurchasedButton
        isOwner={true}
        isPurchased={false}
        purchasedBy={null}
        onChange={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('does not render when purchased by someone else', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'current@example.com' } },
    });

    const { container } = render(
      <MarkPurchasedButton
        isOwner={false}
        isPurchased={true}
        purchasedBy="other@example.com"
        onChange={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders when user purchased the gift themselves', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'user@example.com' } },
    });

    render(
      <MarkPurchasedButton
        isOwner={false}
        isPurchased={true}
        purchasedBy="user@example.com"
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText('Purchased?')).toBeInTheDocument();
  });

  it('passes correct props to CheckboxToggle', () => {
    const mockOnChange = vi.fn();
    useSession.mockReturnValue({
      data: { user: { email: 'user@example.com' } },
    });

    render(
      <MarkPurchasedButton
        isOwner={false}
        isPurchased={true}
        purchasedBy="user@example.com"
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
