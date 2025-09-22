export default function VenueForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">
          Venue Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Venue name"
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description of the venue"
          className="w-full border p-2 rounded"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1 font-semibold">
          Price per night
        </label>
        <input
          type="number"
          id="price"
          placeholder="Price in USD"
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="maxGuests" className="block mb-1 font-semibold">
          Max Guests
        </label>
        <input
          type="number"
          id="maxGuests"
          placeholder="Max number of guests"
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save Venue
      </button>
    </form>
  );
}
