interface GeocodeResult {
  country: string;
  formattedAddress: string;
}
export async function getCountryFromCoordinates(lat: number, lng: number): Promise<GeocodeResult> {
  const apiKey = process.env.GOOGLE_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  console.log("Calling Google Maps API:", url); // log URL

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Google Maps API response:", JSON.stringify(data, null, 2)); // log response

    if (!data.results || data.results.length === 0) {
      console.warn("No geocode results for", lat, lng);
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    const result = data.results[0];
    const countryComponent = result.address_components?.find((component: any) =>
      component.types.includes("country")
    );

    return {
      country: countryComponent?.long_name || "Unknown",
      formattedAddress: result.formatted_address || "Unknown location",
    };
  } catch (error) {
    console.error("Geocoding failed:", error);
    return {
      country: "Unknown",
      formattedAddress: "Unknown location",
    };
  }
}
