import React from "react";
import { it, expect, describe, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PaginationControls from "../../src/components/admin/PaginationControls";

afterEach(() => {
  cleanup();
});

describe("PaginationControls", () => {
  it("renders correctly with given page and totalPages", () => {
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );
    expect(screen.getByText("Page 2 of 5")).toBeDefined();
  });

  it("calls onPrev when Prev button is clicked", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalled();
  });

  it("calls onNext when Next button is clicked", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    expect(onNext).toHaveBeenCalled();
  });
});
