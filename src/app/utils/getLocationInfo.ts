export async function getLocationInfo() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/location-info`);
    if (!response.ok) {
      throw new Error("Failed to fetch location info");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location info:", error);
    return { error: true, currency: "TRY", rate: 1 };
  }
}
