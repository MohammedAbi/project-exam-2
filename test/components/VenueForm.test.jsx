import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import VenueForm from "../../src/components/forms/VenueForm";

const renderForm = () => render(<VenueForm />);

describe("VenueForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields correctly", () => {
    renderForm();

    expect(screen.getByLabelText(/venue name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price per night/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max guests/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save venue/i })
    ).toBeInTheDocument();
  });

  it("updates input values on user typing", () => {
    renderForm();

    const nameInput = screen.getByLabelText(/venue name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price per night/i);
    const guestsInput = screen.getByLabelText(/max guests/i);

    fireEvent.change(nameInput, { target: { value: "Cozy Cabin" } });
    fireEvent.change(descriptionInput, {
      target: { value: "A nice cabin in the woods" },
    });
    fireEvent.change(priceInput, { target: { value: "120" } });
    fireEvent.change(guestsInput, { target: { value: "4" } });

    expect(nameInput.value).toBe("Cozy Cabin");
    expect(descriptionInput.value).toBe("A nice cabin in the woods");
    expect(priceInput.value).toBe("120");
    expect(guestsInput.value).toBe("4");
  });

  it("submits the form when Save Venue button is clicked", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <VenueForm />
      </form>
    );

    const button = screen.getByRole("button", { name: /save venue/i });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
