import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupHeader from './GroupHeader';

// Mock dependencies
vi.mock('../../lib/accentColors', () => ({
  borderColors: ['border-blue-500', 'border-red-500', 'border-green-500', 'border-yellow-500', 'border-purple-500', 'border-pink-500'],
}));

vi.mock('../../lib/randomInt', () => ({
  getRandomInt: vi.fn(() => 0),
}));

describe('GroupHeader', () => {
  const mockProps = {
    name: 'Test Group',
    description: 'Test Description',
    isOwner: true,
    id: 'group-123',
    editedCallback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders group name', () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByText('Test Group')).toBeInTheDocument();
  });

  it('renders group description', () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders Edit button when user is owner', () => {
    render(<GroupHeader {...mockProps} />);
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
  });

  it('does not render Edit button when user is not owner', () => {
    render(<GroupHeader {...mockProps} isOwner={false} />);
    expect(screen.queryByRole('button', { name: /Edit/i })).not.toBeInTheDocument();
  });

  it('shows edit form when Edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole('button', { name: /Edit/i }));

    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('hides group name and description when editing', async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole('button', { name: /Edit/i }));

    const headings = screen.queryAllByText('Test Group');
    // The name should still appear in the form input, but not as a heading
    expect(screen.queryByRole('heading', { name: 'Test Group' })).not.toBeInTheDocument();
  });

  it('shows form fields when editing', async () => {
    const user = userEvent.setup();
    render(<GroupHeader {...mockProps} />);

    await user.click(screen.getByRole('button', { name: /Edit/i }));

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('applies random border color class', () => {
    const { container } = render(<GroupHeader {...mockProps} />);
    const header = container.firstChild;
    expect(header).toHaveClass('border-blue-500');
  });

  it('applies correct heading styles', () => {
    render(<GroupHeader {...mockProps} />);
    const heading = screen.getByText('Test Group');
    expect(heading).toHaveClass('mb-2', 'text-4xl', 'font-extrabold');
  });
});
