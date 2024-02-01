import "./ListingCard.css";
import { Link } from "react-router-dom";

/** Show overview info for listing
 *
 * Props:
 * - listing { id, name, addresss, description, price, photos }
 *
 * States:
 * - None
 *
 * ListingsPage -> Listing Card
 */

function ListingCard({ listing }) {
  const { id, name, address, description, price } = listing;
  const formattedPrice =
  Number(price).toLocaleString("en-US",{ style: 'currency', currency: 'USD' });

  return (
    <div className="ListingCard" >
      <Link className="ListingCard-link" to={`/listings/${id}`}>
        <h2>{name}</h2>
        <h3>{address}</h3>
        <h4>{formattedPrice} per day</h4>
      </Link>
    </div>
  );
}

export default ListingCard;