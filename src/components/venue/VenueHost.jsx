// src/components/venue/VenueHost.jsx
export default function VenueHost({ owner }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Host</h2>
      <div className="flex items-center gap-4">
        <img
          src={owner?.avatar?.url}
          alt={owner?.avatar?.alt || owner?.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
        />
        <div>
          <p className="font-semibold text-lg">{owner?.name}</p>
          <p className="text-gray-600">{owner?.bio}</p>
        </div>
      </div>
    </div>
  );
}
