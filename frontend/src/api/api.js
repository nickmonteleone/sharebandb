const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API class for ShareBandB */

class ShareBAndBApi {

  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET", includesFile = false) {
    console.log("making request");
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      // authorization: `Bearer ${this.token}`,
    };
    // Do not include content-type if multipart form
    if (!includesFile) {
      headers["content-type"] = 'application/json'
    }

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    let body;
    if (method !== "GET" && !includesFile) {
      body = JSON.stringify(data);
    }
    else if (method !== "GET") {
      // intantiate FormData to build body for multipart form
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      body = formData;
    }

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error;
      throw message;
      // throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  static async getListings(search = "") {
    console.log("getting listings. search: ", search);

    if (search) {
      const filteredListings = await this.request("listings", { search });
      return filteredListings;
    }

    const listingsData = await this.request("listings");
    return listingsData.result;
  }

  static async getListing(id) {
    const listingData = await this.request(`listings/${id}`);
    return listingData.result;
  }

  static async addListing(formData) {

    const listingData = await this.request(`listings`, formData, 'POST');
    console.log("listingData", listingData);
    return listingData.added;
  }

  static async addPhoto(formData) {
    console.log("formData", formData);
    console.log("making request for add photo");
    const photoData = await this.request(
      `listings/${formData.listing_id}/photos`,
      formData,
      'POST',
      true
    );
    return photoData.added;
  }


}

export default ShareBAndBApi;