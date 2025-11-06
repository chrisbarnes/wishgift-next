import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('renders with Photo icon', () => {
    render(
      <IconButton
        icon="Photo"
        accessibleText="Add photo"
        clickHandler={() => {}}
      />
    );
    expect(screen.getByText('Add photo')).toBeInTheDocument();
  });

  it('renders with Trash icon', () => {
    render(
      <IconButton
        icon="Trash"
        accessibleText="Delete"
        clickHandler={() => {}}
      />
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders with Edit icon', () => {
    render(
      <IconButton
        icon="Edit"
        accessibleText="Edit"
        clickHandler={() => {}}
      />
    );
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('displays text when displayText is true', () => {
    render(
      <IconButton
        icon="Photo"
        text="Upload"
        displayText={true}
        clickHandler={() => {}}
      />
    );
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('calls clickHandler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <IconButton
        icon="Edit"
        accessibleText="Edit"
        clickHandler={handleClick}
      />
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes when displayText is false', () => {
    render(
      <IconButton
        icon="Edit"
        accessibleText="Edit"
        clickHandler={() => {}}
        displayText={false}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-5', 'h-5');
  });

  it('applies correct classes when displayText is true', () => {
    render(
      <IconButton
        icon="Photo"
        text="Upload"
        displayText={true}
        clickHandler={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex', 'items-center', 'uppercase');
  });
});
