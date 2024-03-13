// Content script logic
window.addEventListener("load", function () {
  // Wait for the page to fully load
  const mapBox = document.querySelector("#lu_map");

  if (mapBox) {
    // console.log("Mapbox present");

    // Extract query parameter value from current webpage URL
    function getQueryParamValue(url, paramName) {
      // Extract query parameters from URL
      const queryString = url.split("?")[1];
      // Split query string into key-value pairs
      const queryParams = new URLSearchParams(queryString);
      // Return the value associated with the given parameter name
      return queryParams.get(paramName);
    }
    const currentUrl = window.location.href;
    const searchTerm = getQueryParamValue(currentUrl, "q");
    // console.log("Search term:", searchTerm);

    // Generate Google Maps search link with a query
    function generateGoogleMapsLink(query) {
      // Encode the query parameter
      const encodedQuery = encodeURIComponent(query);
      // Construct the Google Maps search URL with the encoded query
      const googleMapsLink = `https://www.google.com/maps/search/${encodedQuery}`;
      return googleMapsLink;
    }

    // Generate Google Maps search link with the query
    const mapsLink = generateGoogleMapsLink(searchTerm);
    // console.log("Google Maps search link:", mapsLink);

    mapBox.addEventListener("click", function () {
      // Open a new tab with the Google Maps search link
      window.open(mapsLink, "_blank");
    });
  } else {
    console.log("Mapbox not present");
  }
});
