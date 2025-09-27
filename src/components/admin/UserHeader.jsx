import React from "react";

export default function UserHeader({ user }) {
  return (
    <header
      className="rounded-lg mb-8 sm:mb-12 text-white text-center p-6 sm:p-10 md:p-12 relative overflow-hidden"
      style={{
        backgroundImage: `url(${user.banner?.url || "/default-banner.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src={user.avatar?.url || "/default-avatar.png"}
        alt={user.avatar?.alt || (user.avatar ? user.name : "Default Avatar")}
        className="mx-auto rounded-full border-4 border-white w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover mb-4 shadow-lg"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
        {user.name}
      </h1>
      <p className="mt-1 text-xs sm:text-sm opacity-80 drop-shadow-sm">
        {user.email}
      </p>
    </header>
  );
}
