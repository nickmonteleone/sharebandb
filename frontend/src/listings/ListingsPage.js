import { useEffect, useState } from "react";
import ShareBAndBApi from "../api/api";
import ListingCard from "./ListingCard";
import LoadingSpinner from "../common/LoadingSpinner";

/**Render page showing all available listings for renting
 *
 * Props:
 * -None
 *
 * State:
 * -listings [{ id, name, addresss, description, price, photos },...]
 *
 * RoutesList -> ListingsPage -> { ListingCard, SearchListingsForm }
 */

function ListingsPage() {
  const [listings, setListings] = useState([]);

  useEffect(function fetchAndSetListings() {
    async function getListings() {
      const listingsResults = await ShareBAndBApi.getListings();

      setListings(listingsResults);
    }
    getListings();
  }, []);

  if (!listings) return <LoadingSpinner />;

  return (
    <div>
      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          listing={listing} />
      ))}
    </div>
  );
}

export default ListingsPage;