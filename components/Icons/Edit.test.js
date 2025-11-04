import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Edit from './Edit';

describe('Edit', () => {
  it('renders SVG element', () => {
    const { container } = render(<Edit />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies default size classes', () => {
    const { container } = render(<Edit />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('applies extra classes when provided', () => {
    const { container } = render(<Edit extraClasses="text-blue-500 mr-2" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-blue-500', 'mr-2');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<Edit />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('renders path elements', () => {
    const { container } = render(<Edit />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });
});
