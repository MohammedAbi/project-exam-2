import React from "react";
import { render, screen } from "@testing-library/react";
import PaginationControls from "../../src/components/admin/PaginationControls";

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

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("disables Prev button on first page", () => {
    render(
      <PaginationControls
        page={1}
        totalPages={5}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <PaginationControls
        page={5}
        totalPages={5}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
