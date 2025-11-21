import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('renders SVG element', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5', 'inline-block', 'pb-1', 'mr-2');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('renders path elements', () => {
    const { container } = render(<Logo />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });
});
