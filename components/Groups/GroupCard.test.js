import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GroupCard from './GroupCard';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('GroupCard', () => {
  const mockProps = {
    name: 'Test Group',
    description: 'This is a test group',
    id: 'group-123',
  };

  it('renders group name', () => {
    render(<GroupCard {...mockProps} />);
    expect(screen.getByText('Test Group')).toBeInTheDocument();
  });

  it('renders group description', () => {
    render(<GroupCard {...mockProps} />);
    expect(screen.getByText('This is a test group')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<GroupCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/groups/group-123');
  });

  it('applies correct CSS classes to link', () => {
    render(<GroupCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('font-bold', 'underline');
  });

  it('applies correct CSS classes to container', () => {
    const { container } = render(<GroupCard {...mockProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass('px-6', 'py-4', 'shadow-md', 'rounded-md', 'bg-white');
  });
});
