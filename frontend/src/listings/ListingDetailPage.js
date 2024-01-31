import "./ListingDetailPage.css"
import { useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../common/NotFound";
import LoadingSpinner from "../common/LoadingSpinner";
import ShareBAndBApi from "../api/api";

/** Page for showing listing details
 * Has URL param id
 *
 * Props:
 * - None
 *
 * States:
 * - listingDetails { id, name, addresss, description, price, photos }
 * - error (true/false)
 *
 * RoutesList -> ListingDetailPage -> { LoadingSpinner, NotFound }
 */

function ListingDetailPage() {
  const { id } = useParams();
  console.log("ListingDetailPage rendered. id:", id);

  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);

  useEffect(function getListingDetailOnMount() {
    async function getListingDetail() {


    }
  })


  return (
    <div className="ListingDetailPage">
      ListingDetailPage
    </div>
  );
}

export default ListingDetailPage;