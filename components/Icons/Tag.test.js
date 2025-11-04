import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  it('renders SVG element', () => {
    const { container } = render(<Tag />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies default size classes', () => {
    const { container } = render(<Tag />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('applies small size classes', () => {
    const { container } = render(<Tag size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('applies medium size classes', () => {
    const { container } = render(<Tag size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-8', 'w-8');
  });

  it('applies large size classes', () => {
    const { container } = render(<Tag size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-12', 'w-12');
  });

  it('applies xl size classes', () => {
    const { container } = render(<Tag size="xl" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-14', 'w-14');
  });

  it('applies xxl size classes', () => {
    const { container } = render(<Tag size="xxl" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-16', 'w-16');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<Tag />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });
});
