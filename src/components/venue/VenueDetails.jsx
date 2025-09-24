// src/components/venue/VenueDetails.jsx
import VenueHeader from "./VenueHeader";
import VenueAmenities from "./VenueAmenities";
import VenueLocation from "./VenueLocation";
import VenueHost from "./VenueHost";
import VenueSidebar from "./VenueSidebar";

export default function VenueDetails({ venue, defaultGuests, accessToken }) {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        {venue.media?.length > 0 && (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || `${venue.name} main image`}
            className="w-full mb-12 rounded-lg shadow-lg object-cover max-h-[450px]"
          />
        )}

        <div className="flex flex-col lg:flex-row flex-wrap gap-12">
          {/* Left column */}
          <div className="lg:flex-1 min-w-0">
            <VenueHeader venue={venue} />
            <VenueAmenities
              meta={venue.meta}
              price={venue.price}
              maxGuests={venue.maxGuests}
            />
            <VenueLocation location={venue.location} />
            <VenueHost owner={venue.owner} />
          </div>

          {/* Right column (sidebar) */}
          <VenueSidebar
            venue={venue}
            defaultGuests={defaultGuests}
            accessToken={accessToken}
          />
        </div>
      </div>
    </section>
  );
}
