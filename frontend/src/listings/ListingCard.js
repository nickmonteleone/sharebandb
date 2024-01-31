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

function ListingCard ({ listing }) {
  const { id, name, address, description, price } = listing;

  return (
    <Link className="ListingCard" to={`listings/${id}`}>
      <h3>{name}</h3>
      <h4>{address}</h4>
      <p>{description}</p>
      <h4>{price}</h4>
    </Link>
  )
}

export default ListingCard