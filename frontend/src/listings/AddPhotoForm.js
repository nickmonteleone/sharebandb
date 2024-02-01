import { useState } from "react";

const INITIAL_FORM_DATA = {
  file: null,
  description: "",
  listing_id: "",
};

/** Form for adding a photo to a listing
 *
 * Props:
 * - addPhoto()
 * - initialFormData { file, description, listing_id }
 *
 * States:
 * - formData { file, description, listing_id }
 */

function AddPhotoForm({ addPhoto, initialFormData = INITIAL_FORM_DATA }) {

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

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
   async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("submitted add photo form", formData);
    try {
      await addPhoto(formData);
      setFormData(initialFormData);
    }
    catch (errs) {
      console.log("form submission errors", errs);
      setFormErrors(errs);
    }

  }

  return (
    <form className="ListingForm" onSubmit={handleSubmit}>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="listing_id">
          Listing id:
        </label>
        <input
          name="listing_id"
          className="form-control"
          value={formData.listing_id}
          onChange={handleChange}
        />
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <input
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="file">
          Photo:
        </label>
        <input
          name="file"
          className="form-control"
          value={formData.file}
          onChange={handleChange}
          type="file"
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

export default AddPhotoForm;