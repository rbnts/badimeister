const apiUrl = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_en.json";

interface AirResponse {
  features: {
    id: string;
    properties: {
      value: number;
      unit: string;
    };
  }[];
}

const isAirResponse = (data: unknown): data is AirResponse => (
  typeof data === "object"
  && data !== null
  && "features" in data
  && Array.isArray(data.features)
);

export const fetchAirTemperature = async (): Promise<string | null> => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`MeteoSchweiz: ${response.status.toString()}`);
  }

  const data: unknown = await response.json();

  if (!isAirResponse(data)) {
    throw new Error("MeteoSchweiz: Unerwarteti Antwort");
  }

  const station = data.features.find(({ id }) => id === "BER");

  return station
    ? `${Math.round(station.properties.value).toString()} ${station.properties.unit}`
    : null;
};
