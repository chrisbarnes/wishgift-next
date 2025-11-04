import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Photo from './Photo';

describe('Photo', () => {
  it('renders SVG element', () => {
    const { container } = render(<Photo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies default size classes', () => {
    const { container } = render(<Photo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('applies extra classes when provided', () => {
    const { container } = render(<Photo extraClasses="text-green-500 ml-2" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-green-500', 'ml-2');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<Photo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('renders path element with fillRule and clipRule', () => {
    const { container } = render(<Photo />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill-rule', 'evenodd');
    expect(path).toHaveAttribute('clip-rule', 'evenodd');
  });
});
