export async function reverseGeocodeCountry(lat: number, lng: number): Promise<string | null> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`,
  )
  if (!response.ok) {
    return null
  }
  const data = await response.json()
  return data.address?.country ?? null
}
