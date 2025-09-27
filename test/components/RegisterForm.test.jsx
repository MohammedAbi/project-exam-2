import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../../src/components/forms/RegisterForm";

// Mock useAuth
const mockRegister = vi.fn();

vi.mock("../../src/hooks/useAuth", () => ({
  useAuth: () => ({
    register: mockRegister,
    loading: false,
  }),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("RegisterForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  });

  it("renders all form fields", () => {
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    expect(screen.getByLabelText("Password *")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password *")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByLabelText("Avatar URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Banner URL")).toBeInTheDocument();

    const altInputs = screen.getAllByLabelText("Alt text");
    expect(altInputs.length).toBe(2);
  });

  it("updates password and confirm password fields correctly", () => {
    const password = screen.getByLabelText("Password *");
    const confirmPassword = screen.getByLabelText("Confirm Password *");

    fireEvent.change(password, { target: { value: "secret123" } });
    fireEvent.change(confirmPassword, { target: { value: "secret123" } });

    expect(password.value).toBe("secret123");
    expect(confirmPassword.value).toBe("secret123");
  });

  it("shows error if password and confirm password mismatch", async () => {
    const password = screen.getByLabelText("Password *");
    const confirmPassword = screen.getByLabelText("Confirm Password *");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(password, { target: { value: "secret123" } });
    fireEvent.change(confirmPassword, { target: { value: "wrongpass" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("calls register on valid form submission", async () => {
    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john.doe@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "secret123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "secret123" },
    });
    fireEvent.change(screen.getByLabelText("Bio"), {
      target: { value: "Hello world" },
    });
    fireEvent.change(screen.getByLabelText("Avatar URL"), {
      target: { value: "http://avatar.com" },
    });
    fireEvent.change(screen.getByLabelText("Banner URL"), {
      target: { value: "http://banner.com" },
    });

    const altInputs = screen.getAllByLabelText("Alt text");
    fireEvent.change(altInputs[0], { target: { value: "Avatar alt text" } });
    fireEvent.change(altInputs[1], { target: { value: "Banner alt text" } });

    const submitButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john.doe@stud.noroff.no",
          password: "secret123",
          confirmPassword: "secret123",
          bio: "Hello world",
          avatarUrl: "http://avatar.com",
          avatarAlt: "Avatar alt text",
          bannerUrl: "http://banner.com",
          bannerAlt: "Banner alt text",
        })
      );
    });
  });
});
