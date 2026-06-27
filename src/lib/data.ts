export interface Badi {
  id: string;
  name: string;
  open: boolean;
  temperature: string;
  url: string;
}

const airUrl = "https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_en.json";

const bernApi = import.meta.env.DEV
  ? "/bern"
  : "https://sportamtbern-api.webcloud7.ch/sportanlagen/outdoor-anlagen/freibaeder";

const bernPage = "https://www.sportamt-bern.ch/sportanlagen/outdoor-anlagen/freibaeder";

const bernIds = [
  "freibad-ka-we-de",
  "freibad-lorraine",
  "freibad-marzili",
  "freibad-weyermannshaus",
  "freibad-wyler"
] as const;

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
  const response = await fetch(airUrl);

  if (!response.ok) {
    throw new Error(`MeteoSchweiz: ${response.status.toString()}`);
  }

  const data: unknown = await response.json();

  if (!isAirResponse(data)) {
    throw new Error("MeteoSchweiz: Unerwarteti Antwort");
  }

  const station = data.features.find(({ id }) => id === "BER");

  return station
    ? `${Math.round(station.properties.value).toString()}${station.properties.unit}`
    : null;
};

interface BernFacility {
  id: string;
  title: string;
  structured_opening_hours: {
    closed: boolean;
  };
  external_apis: {
    items: {
      value: string;
    }[];
  };
}

const isBernFacility = (data: unknown): data is BernFacility => (
  typeof data === "object"
  && data !== null
  && "id" in data
  && "title" in data
  && "structured_opening_hours" in data
  && "external_apis" in data
);

export const fetchBernBadis = async (): Promise<Badi[]> => Promise.all(
  bernIds.map(async (id) => {
    const response = await fetch(`${bernApi}/${id}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Sportamt Bärn: ${response.status.toString()}`);
    }

    const data: unknown = await response.json();

    if (!isBernFacility(data)) {
      throw new Error("Sportamt Bärn: unerwarteti Antwort");
    }

    const temperature = data.external_apis.items.find(
      ({ value }) => value.endsWith(" °C")
    )?.value ?? "Weiss nid";

    return {
      id: data.id,
      name: data.title,
      open: !data.structured_opening_hours.closed,
      url: `${bernPage}/${data.id}`,
      temperature
    };
  })
);
