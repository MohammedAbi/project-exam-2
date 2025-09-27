import React from "react";
import { render, screen } from "@testing-library/react";
import UserHeader from "../../src/components/admin/UserHeader";

describe("UserHeader", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: { url: "/avatar.jpg", alt: "John's avatar" },
    banner: { url: "/banner.jpg" },
  };

  it("renders correctly with full user data", () => {
    render(<UserHeader user={mockUser} />);

    // Avatar image
    const avatar = screen.getByRole("img", { name: "John's avatar" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/avatar.jpg");

    // Header background
    const header = screen.getByRole("banner");
    expect(header).toHaveStyle(`background-image: url(${mockUser.banner.url})`);

    // Name and email
    expect(
      screen.getByRole("heading", { name: "John Doe" })
    ).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders default avatar when avatar is missing", () => {
    render(<UserHeader user={{ ...mockUser, avatar: undefined }} />);

    const avatar = screen.getByRole("img", { name: /default avatar/i });
    expect(avatar).toHaveAttribute("src", "/default-avatar.png");
  });

  it("renders without banner when banner is missing", () => {
    render(<UserHeader user={{ ...mockUser, banner: undefined }} />);

    const header = screen.getByRole("banner");
    expect(header).not.toHaveStyle(
      `background-image: url(${mockUser.banner?.url})`
    );
  });
});
