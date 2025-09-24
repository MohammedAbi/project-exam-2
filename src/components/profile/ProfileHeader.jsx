import React from "react";

export default function ProfileHeader({ profile, onEdit }) {
  return (
    <header
      className="mb-12 text-white text-center p-12 relative overflow-hidden"
      style={{
        backgroundImage: `url(${profile.banner?.url || "/default-banner.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src={profile.avatar?.url || "/default-avatar.png"}
        alt={profile.avatar?.alt || profile.name || "User avatar"}
        className="mx-auto rounded-full border-4 border-white w-32 h-32 object-cover mb-4 shadow-lg"
      />
      <h1 className="text-4xl font-extrabold drop-shadow-lg">{profile.name}</h1>
      <p className="mt-3 max-w-xl mx-auto text-lg font-light drop-shadow-sm">
        {profile.bio}
      </p>
      <p className="mt-1 text-sm opacity-80 drop-shadow-sm">{profile.email}</p>
      <div className="w-full flex md:justify-start justify-center items-center">
        <button
          onClick={onEdit}
          className="py-2 px-4 rounded bg-green-700 hover:bg-green-900 mt-6"
        >
          Edit profile
        </button>
      </div>
    </header>
  );
}
