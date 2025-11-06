import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

// Mock Navigation component
vi.mock('../Navigation/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

describe('Layout', () => {
  it('renders Navigation component', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders children inside main element', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct CSS classes to main element', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const main = container.querySelector('main');
    expect(main).toHaveClass('container', 'px-8', 'py-8', 'mx-auto');
  });

  it('renders multiple children correctly', () => {
    render(
      <Layout>
        <div>First Child</div>
        <div>Second Child</div>
      </Layout>
    );
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });
});
