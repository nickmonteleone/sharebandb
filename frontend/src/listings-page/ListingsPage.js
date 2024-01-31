import { useEffect, useState } from "react";
import ShareBAndBApi from "../api/api";
/**Render page showing all available listings for renting
 *
 * Props:
 * -None
 *
 * State:
 * -listings
 *
 * RoutesList -> ListingsPage -> { ListingCard, SearchListingsForm }
 */

function ListingsPage(){
  const [listings, setListings] = useState([]);

  useEffect(function fetchAndSetListings(){
    async function getListings(){
      const listingsResults = await ShareBAndBApi.getListings();

      setListings(listingsResults);
    }
    getListings();
  }, []);

  if(!listings) return <LoadingSpinner />;

  return(
    <div>
      { listings.map(listing => <ListingCard listing={listing}/>) }
    </div>
  );

}