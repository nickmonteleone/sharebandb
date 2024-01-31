import "./AddListingPage.css"
import ListingForm from "./ListingForm";

/** Page for adding listing to app
 *
 * Props:
 * - addListing()
 *
 * States:
 * - formData
 *
 * RoutesList -> AddListingPage -> ListingForm
 */

function AddListingPage({ addListing }) {
  return (
    <div className="AddListingPage">
      AddListingPage
      <ListingForm saveListing={addListing} />
    </div>
  );
}

export default AddListingPage;