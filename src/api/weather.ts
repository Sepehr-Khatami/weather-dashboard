import axios from "axios";

// Type for weather response
export type WeatherData = {
  temperature: number;
  windspeed: number;
  time: string;
};

// Type for city/place returned by Nominatim
export type Place = {
  display_name: string;
  lat: string;
  lon: string;
};

// Fetch weather from Open-Meteo
export async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  const res = await axios.get<{ current_weather: WeatherData }>(
    "https://api.open-meteo.com/v1/forecast",
    { params: { latitude: lat, longitude: lon, current_weather: true } }
  );
  return res.data?.current_weather ?? null;
}

// Search city/place
export async function searchPlaces(query: string): Promise<Place[]> {
  const res = await axios.get<Place[]>(
    "https://nominatim.openstreetmap.org/search",
    { params: { q: query, format: "jsonv2", addressdetails: 1, limit: 8 } }
  );
  return res.data;
}
