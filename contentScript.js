// Content script logic
window.addEventListener("load", function () {
  // Wait for the page to fully load
  const mapBox = document.querySelector("#lu_map");
  const intMap = document.querySelector("#dimg_1");

  // if mapbox or intmap
  if (mapBox || intMap) {
    // Extract query parameter value from current webpage URL
    function getQueryParamValue(url, paramName) {
      const queryString = url.split("?")[1];
      const queryParams = new URLSearchParams(queryString);
      return queryParams.get(paramName);
    }

    const currentUrl = window.location.href;
    const searchTerm = getQueryParamValue(currentUrl, "q");

    // Generate Google Maps search link with a query
    function generateGoogleMapsLink(query) {
      const encodedQuery = encodeURIComponent(query);
      const googleMapsLink = `https://www.google.com/maps/search/${encodedQuery}`;
      return googleMapsLink;
    }

    // Generate Google Maps search link with the query
    const mapsLink = generateGoogleMapsLink(searchTerm);

    if (mapBox) {
      mapBox.addEventListener("click", function () {
        window.open(mapsLink, "_blank");
      });
    }
    if (intMap) {
      intMap.addEventListener("click", function () {
        window.open(mapsLink, "_blank");
      });
    }
  }
});
