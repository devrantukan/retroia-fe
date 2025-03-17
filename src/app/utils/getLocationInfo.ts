export async function getLocationInfo() {
  try {
    const response = await fetch("/emlak/api/location-info");
    if (!response.ok) {
      throw new Error("Failed to fetch location info");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location info:", error);
    return { error: true, currency: "TRY", rate: 1 };
  }
}
