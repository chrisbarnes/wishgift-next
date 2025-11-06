import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  it('renders button text', () => {
    render(<ToggleButton text="Show More" />);
    expect(screen.getByText('Show More')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<ToggleButton text="Toggle" />);
    const span = screen.getByText('Toggle');
    expect(span).toHaveClass(
      'text-white',
      'bg-blue-700',
      'hover:bg-blue-800',
      'font-medium',
      'rounded-lg',
      'text-sm',
      'px-5',
      'py-2.5',
      'text-center'
    );
  });

  it('renders with different text', () => {
    render(<ToggleButton text="Expand Content" />);
    expect(screen.getByText('Expand Content')).toBeInTheDocument();
  });
});
