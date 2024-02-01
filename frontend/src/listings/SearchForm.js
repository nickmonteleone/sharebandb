import React, { useState } from "react";

function SearchForm({ search }){
  const [searchTerm, setSearchTerm] = useState("");
  console.log("searchTerm", searchTerm);

  /**take inputted search term and pass to
   *  search function to filter listings
   *
   */

  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}
        className="SearchForm">
        <input
          className="SearchFrom-text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}>
        </input>
      <button>Search</button>
      </form>
    </div>
  );
}

export default SearchForm;