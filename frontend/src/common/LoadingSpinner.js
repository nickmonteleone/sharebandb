
/** Loading spinner while getting data from backend api.
 *
 * Props:
 * - None
 *
 * States:
 * - None
 *
 * { ListingsPage, ListingDetail } -> LoadingSpinner
 */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      Loading ...
    </div>
  );
}

export default LoadingSpinner;