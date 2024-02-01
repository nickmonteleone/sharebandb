const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API class for ShareBandB */

class ShareBAndBApi {

  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET", includesFile=false) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      // authorization: `Bearer ${this.token}`,
      'content-type': (includesFile === false
      ? 'application/json'
      : 'multipart/form-data')
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

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

  static async getListing(id){
    const listingData = await this.request(`listings/${id}`);
    return listingData.result;
  }

  static async addListing(formData){

    const listingData = await this.request(`listings`, formData, 'POST');
    console.log("listingData", listingData);
    return listingData.added;
  }

  static async addPhoto(formData){
    const photoData =
     await this.request(`listings/${formData.id}/photos`, formData, 'POST', true);

  }


}

export default ShareBAndBApi;