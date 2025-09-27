import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VenueActions from "../../src/components/admin/VenueActions";

describe("VenueActions", () => {
  const setup = (props = {}) => {
    const onEdit = props.onEdit || vi.fn();
    const onDelete = props.onDelete || vi.fn();

    render(<VenueActions onEdit={onEdit} onDelete={onDelete} />);
    return { onEdit, onDelete };
  };

  it("renders both Edit and Delete buttons with correct text", () => {
    setup();

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const { onEdit, onDelete } = setup();

    screen.getByRole("button", { name: /edit/i }).click();

    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("calls onDelete when Delete button is clicked", () => {
    const { onEdit, onDelete } = setup();

    screen.getByRole("button", { name: /delete/i }).click();

    expect(onDelete).toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
  });

  it("buttons have expected CSS classes", () => {
    setup();

    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(editButton).toHaveClass("bg-blue-600");
    expect(deleteButton).toHaveClass("bg-red-600");
  });
});
