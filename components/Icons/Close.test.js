import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Close from './Close';

describe('Close', () => {
  it('renders SVG element', () => {
    const { container } = render(<Close />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies default size classes', () => {
    const { container } = render(<Close />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-6', 'w-6');
  });

  it('applies medium size classes', () => {
    const { container } = render(<Close size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-8', 'w-8');
  });

  it('applies large size classes', () => {
    const { container } = render(<Close size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-10', 'w-10');
  });

  it('applies extra classes when provided', () => {
    const { container } = render(<Close extraClasses="text-red-500" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-red-500');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<Close />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });
});
