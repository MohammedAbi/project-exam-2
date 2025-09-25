import React from "react";
import { it, expect, describe, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import VenueActions from "../../src/components/admin/VenueActions";

afterEach(() => cleanup());

describe("VenueActions", () => {
  it("calls onEdit when Edit button is clicked", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<VenueActions onEdit={onEdit} onDelete={onDelete} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<VenueActions onEdit={onEdit} onDelete={onDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
  });

  it("renders both Edit and Delete buttons", () => {
    render(<VenueActions onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
