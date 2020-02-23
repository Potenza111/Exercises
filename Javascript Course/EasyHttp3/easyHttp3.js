/**
 * EASYHTTP3 Object
 *
 * @version 3.0.0
 * @author Daneel van Tonder
 * @license MIT
 *
 **/

class EASYHTTP3 {
  // Make an HTTP Get Request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // Make an HTTP Post Request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP PUT Request (update)
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP Delete Request (update)
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    });

    const resData = await "Resource Deleted....";
    return resData;
  }
}
