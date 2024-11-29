/**
 * This script enhances webpages with embedded map elements.
 * When users click on these maps, they are redirected to Google Maps with a search query derived
 * from the current page's URL ("q" query parameter). It dynamically identifies relevant map
 * elements using specified CSS selectors and ensures a smooth redirection experience.
 */
window.addEventListener("load", () => {
  /**
   * Extracts the value of a specific query parameter from a URL.
   * @param {string} url - The URL to parse.
   * @param {string} paramName - The name of the query parameter.
   * @returns {string|null} The value of the query parameter, or null if not found.
   */
  const getQueryParamValue = (url, paramName) => {
    const queryParams = new URL(url).searchParams;
    return queryParams.get(paramName);
  };

  /**
   * Generates a Google Maps search link for a given query.
   * @param {string} query - The search query.
   * @returns {string} A fully encoded Google Maps search URL.
   */
  const generateGoogleMapsLink = (query) =>
    `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  try {
    // Extract the "q" query parameter from the current page's URL.
    const currentUrl = window.location.href;
    const searchTerm = getQueryParamValue(currentUrl, "q");

    if (!searchTerm) {
      console.warn("No search term ('q' parameter) found in the URL.");
      return; // No query to process, exit early.
    }

    const googleMapsLink = generateGoogleMapsLink(searchTerm);

    /**
     * Redirects to Google Maps when a map element is clicked.
     * @param {Event} event - The click event.
     */
    const redirectToMaps = (event) => {
      event.preventDefault(); // Prevent the default click behavior.
      window.open(googleMapsLink, "_blank");
    };

    // CSS selectors for identifying map elements.
    const mapSelectors = [
      "#lu_map", // Map container.
      "#dimg_1", // Map image.
    ];

    // Attach a single event listener for clicks on all matching elements.
    document.body.addEventListener("click", (event) => {
      const target = event.target.closest(mapSelectors.join(", "));
      if (target) {
        redirectToMaps(event);
      }
    });
  } catch (error) {
    console.error(
      "An error occurred while setting up map redirection:",
      error.message,
      error
    );
  }
});
