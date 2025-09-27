import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const loginMock = vi.fn().mockResolvedValue({ email: "test@stud.noroff.no" });

vi.mock("../../../src/hooks/useAuth", () => ({
  useAuth: () => ({
    login: loginMock,
    loading: false,
    error: null,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import LoginForm from "../../../src/components/forms/LoginForm";
import { toast } from "react-toastify";
import * as authStorage from "../../../src/config/services/authStorage";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("LoginForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("updates input values on user typing", () => {
    renderWithRouter(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    expect(screen.getByLabelText(/email/i).value).toBe("test@stud.noroff.no");
    expect(screen.getByLabelText(/password/i).value).toBe("password123");
  });

  it("calls login and navigates on submit", async () => {
    vi.spyOn(authStorage, "isLoggedIn").mockReturnValue(false);

    renderWithRouter(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        "test@stud.noroff.no",
        "password123"
      );
      expect(toast.success).toHaveBeenCalledWith("Login successful!");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects if already logged in", () => {
    vi.spyOn(authStorage, "isLoggedIn").mockReturnValue(true);
    renderWithRouter(<LoginForm />);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows error toast if login fails", async () => {
    vi.spyOn(authStorage, "isLoggedIn").mockReturnValue(false);
    loginMock.mockResolvedValueOnce(null);

    renderWithRouter(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed. Please try again."
      );
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
