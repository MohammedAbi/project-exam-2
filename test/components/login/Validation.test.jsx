import { toast } from "react-toastify";
import {
  validateContact,
  ValidateLogin,
  validateRegister,
} from "../../../src/components/forms/formValidation/Validation";

// Mock toast.error
vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() },
}));

describe("Form Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ------------------
  // Register Validation
  // ------------------
  describe("validateRegister", () => {
    it("returns errors for empty fields", () => {
      const errors = validateRegister({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      expect(errors.name).toBe("Name is required");
      expect(errors.email).toBe("Email is required");
      expect(errors.password).toBe("Password is required");
      expect(errors.confirmPassword).toBe("Please confirm your password");
    });

    it("returns error for invalid email and short password", () => {
      const errors = validateRegister({
        name: "John",
        email: "test@gmail.com",
        password: "123",
        confirmPassword: "123",
      });
      expect(errors.email).toBe(
        "Email must be a valid @stud.noroff.no address"
      );
      expect(errors.password).toBe(
        "Password must be at least 8 characters long"
      );
    });

    it("returns error when passwords do not match", () => {
      const errors = validateRegister({
        name: "John",
        email: "john@stud.noroff.no",
        password: "12345678",
        confirmPassword: "87654321",
      });
      expect(errors.confirmPassword).toBe("Passwords do not match");
    });

    it("returns empty object for valid input", () => {
      const errors = validateRegister({
        name: "John",
        email: "john@stud.noroff.no",
        password: "12345678",
        confirmPassword: "12345678",
      });
      expect(errors).toEqual({});
    });
  });

  // ------------------
  // Login Validation
  // ------------------
  describe("validateLogin", () => {
    it("fails for empty fields and triggers toast", () => {
      const result = ValidateLogin({ email: "", password: "" });
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith(
        "Please fill in both email and password"
      );
    });

    it("fails for invalid email", () => {
      const result = ValidateLogin({
        email: "test@gmail.com",
        password: "12345678",
      });
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith(
        "Email must be a valid @stud.noroff.no address"
      );
    });

    it("fails for short password", () => {
      const result = ValidateLogin({
        email: "john@stud.noroff.no",
        password: "123",
      });
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalledWith(
        "Password must be at least 8 characters"
      );
    });

    it("passes for valid input", () => {
      const result = ValidateLogin({
        email: "john@stud.noroff.no",
        password: "12345678",
      });
      expect(result).toBe(true);
    });
  });

  // ------------------
  // Contact Validation
  // ------------------
  describe("validateContact", () => {
    it("fails for empty name, email, or message", () => {
      const result = validateContact({ name: "", email: "test@", message: "" });
      expect(result).toBe(false);
      expect(toast.error).toHaveBeenCalled();
    });

    it("passes for valid input", () => {
      const result = validateContact({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      });
      expect(result).toBe(true);
    });
  });
});
