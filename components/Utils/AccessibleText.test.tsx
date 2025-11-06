import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccessibleText from './AccessibleText';

describe('AccessibleText', () => {
  it('renders children text', () => {
    render(<AccessibleText>Screen reader only text</AccessibleText>);
    expect(screen.getByText('Screen reader only text')).toBeInTheDocument();
  });

  it('applies visually hidden styles', () => {
    const { container } = render(<AccessibleText>Hidden text</AccessibleText>);
    const span = container.querySelector('span');
    expect(span).toHaveClass('absolute', 'overflow-hidden');
  });

  it('has correct inline styles for screen reader accessibility', () => {
    const { container } = render(<AccessibleText>SR text</AccessibleText>);
    const span = container.querySelector('span');
    expect(span).toHaveStyle({
      height: '1px',
      width: '1px',
      clip: 'rect(1px, 1px, 1px, 1px)',
    });
  });

  it('renders multiple children', () => {
    render(
      <AccessibleText>
        <span>Multiple</span> <span>Elements</span>
      </AccessibleText>
    );
    expect(screen.getByText('Multiple')).toBeInTheDocument();
    expect(screen.getByText('Elements')).toBeInTheDocument();
  });
});
