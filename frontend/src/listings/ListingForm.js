import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  address: "",
  description: "",
  price: "0",
};

/** Form for adding a listing
 *
 * Props:
 * - saveListing()
 * - initialFormData { name, addresss, description, price, photos }
 *
 * States:
 * - formData { name, addresss, description, price, photos }
 * - formErrors []
 *
 * AddListingPage -> ListingForm
 */

function ListingForm({ saveListing, initialFormData = INITIAL_FORM_DATA }) {

  const [formData, setFormData] = useState(initialFormData);

  /** Handle change to form, update state. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => (
      {
        ...data,
        [name]: value,
      }
    ));
  }

  /** Handle form submission and reset form. */
  function handleSubmit(evt) {
    evt.preventDefault();

    saveListing(formData);

    setFormData(initialFormData);
  }

  return (
    <form className="ListingForm" onSubmit={handleSubmit}>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="address">
          Address:
        </label>
        <input
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="price">
          Price:
        </label>
        <input
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div className="d-grid">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      </div>


    </form>
  );
}

export default ListingForm;