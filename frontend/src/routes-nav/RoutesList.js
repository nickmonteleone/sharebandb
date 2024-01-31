import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";

/** Routes for sharebandb app.
 *
 * Props:
 * - addListing()
 *
 * States:
 * - None
 *
 * App -> RoutesList
 * -> {NotFound, ListingDetailPage, AddListingPage, ListingsPage}
 */

function RoutesList({ login, signup, currentUser }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <div className="pt-5">
      <Routes>
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route path="/listings/new" element={<AddListingPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RoutesList;