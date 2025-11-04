import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateGift from './CreateGift';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

import { useRouter } from 'next/router';

describe('CreateGift', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      query: { groupId: 'group-123' },
    });
    global.fetch = vi.fn();
  });

  it('renders add gift button initially', () => {
    render(<CreateGift updated={vi.fn()} />);
    expect(screen.getByRole('button', { name: /\+ Gift/i })).toBeInTheDocument();
  });

  it('shows form when add gift button is clicked', async () => {
    const user = userEvent.setup();
    render(<CreateGift updated={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));

    expect(screen.getByText('Add a Gift')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders all form fields when in edit mode', async () => {
    const user = userEvent.setup();
    render(<CreateGift updated={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('For (if not for you)')).toBeInTheDocument();
    expect(screen.getByText('Price ($)')).toBeInTheDocument();
  });

  it('renders Submit and Cancel buttons in form', async () => {
    const user = userEvent.setup();
    render(<CreateGift updated={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('hides form when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<CreateGift updated={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));
    await user.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(screen.queryByText('Add a Gift')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ Gift/i })).toBeInTheDocument();
  });

  it('applies correct height classes based on editing state', () => {
    const { container } = render(<CreateGift updated={vi.fn()} />);
    const card = container.firstChild;
    expect(card).toHaveClass('h-64');
  });

  it('shows loading indicator while submitting gift', async () => {
    const user = userEvent.setup();
    const mockUpdated = vi.fn();

    // Mock fetch to delay response
    global.fetch = vi.fn(() =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: async () => ({ data: { message: 'Success' } }),
          });
        }, 100);
      })
    );

    render(<CreateGift updated={mockUpdated} />);

    // Open the form
    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));

    // Fill in required field
    const nameInput = screen.getByLabelText(/Name/i);
    await user.type(nameInput, 'Test Gift');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Submit/i }));

    // Check loading indicator is shown
    expect(screen.getByText('Adding gift...')).toBeInTheDocument();
    // Form should not be visible
    expect(screen.queryByText('Add a Gift')).not.toBeInTheDocument();
  });

  it('resets form and shows it again after successful submission', async () => {
    const user = userEvent.setup();
    const mockUpdated = vi.fn();

    // Mock successful fetch response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: async () => ({ data: { message: 'Success' } }),
      })
    );

    render(<CreateGift updated={mockUpdated} />);

    // Open the form
    await user.click(screen.getByRole('button', { name: /\+ Gift/i }));

    // Fill in fields
    const nameInput = screen.getByLabelText(/Name/i);
    await user.type(nameInput, 'Test Gift');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Submit/i }));

    // Wait for submission to complete
    await vi.waitFor(() => {
      expect(mockUpdated).toHaveBeenCalled();
    });

    // Form should be visible again
    expect(screen.getByText('Add a Gift')).toBeInTheDocument();

    // Form fields should be empty
    const nameInputAfter = screen.getByLabelText(/Name/i);
    expect(nameInputAfter).toHaveValue('');
  });
});
