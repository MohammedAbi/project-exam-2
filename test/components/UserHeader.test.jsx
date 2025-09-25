import React from "react";
import { it, expect, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import UserHeader from "../../src/components/admin/UserHeader";

afterEach(() => cleanup());

describe("UserHeader", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: { url: "/avatar.jpg", alt: "John's avatar" },
    banner: { url: "/banner.jpg" },
  };

  it("renders correctly with full user data", () => {
    render(<UserHeader user={mockUser} />);

    // Avatar image by role and accessible name
    const avatar = screen.getByRole("img", { name: "John's avatar" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/avatar.jpg");

    // Header by role "banner"
    const header = screen.getByRole("banner");
    expect(header).toHaveStyle(`background-image: url(${mockUser.banner.url})`);

    // Name and email text
    expect(
      screen.getByRole("heading", { name: "John Doe" })
    ).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
