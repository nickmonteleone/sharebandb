import "./AddListingPage.css"
import ListingForm from "./ListingForm";
import ShareBAndBApi from "../api/api";
import { useNavigate } from "react-router-dom";

/** Page for adding listing to app
 *
 * Props:
 * -None
 *
 * States:
 * -
 *
 * RoutesList -> AddListingPage -> ListingForm
 */

function AddListingPage() {
  const navigate = useNavigate();

  async function saveListing(listingData) {
    console.log('adding listing', listingData);
    const result = await ShareBAndBApi.addListing(listingData);
    console.log('result', result);
    navigate(`/listings/${result.id}`);
  }

  return (
    <div className="AddListingPage">
      AddListingPage
      <ListingForm saveListing={saveListing} />
    </div>
  );
}

export default AddListingPage;