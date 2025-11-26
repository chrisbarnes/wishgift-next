import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GiftsCount from "./GiftsCount";

describe("GiftsCount", () => {
  it('displays "No gifts found" when filteredGifts is 0', () => {
    render(<GiftsCount totalGifts={5} filteredGifts={0} />);
    expect(screen.getByText("No gifts found.")).toBeInTheDocument();
  });

  it("displays count for a single gift", () => {
    render(<GiftsCount totalGifts={1} filteredGifts={1} />);
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/gift\./)).toBeInTheDocument();
  });

  it('displays count with plural "gifts" for multiple gifts', () => {
    render(<GiftsCount totalGifts={5} filteredGifts={5} />);
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/gifts\./)).toBeInTheDocument();
  });

  it('shows "all" when showing all gifts', () => {
    render(<GiftsCount totalGifts={10} filteredGifts={10} />);
    expect(screen.getByText(/all/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  it('does not show "all" when filtered count is less than total', () => {
    render(<GiftsCount totalGifts={10} filteredGifts={5} />);
    expect(screen.queryByText(/all/)).not.toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('does not show "all" when there is only one gift', () => {
    render(<GiftsCount totalGifts={1} filteredGifts={1} />);
    expect(screen.queryByText(/all/)).not.toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<GiftsCount totalGifts={3} filteredGifts={3} />);
    const paragraph = screen.getByText(/gift/).closest("p");
    expect(paragraph).toHaveClass("text-2xl", "font-light");
  });
});
