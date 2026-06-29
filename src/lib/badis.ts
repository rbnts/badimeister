export interface UiBadi {
  id: string;
  name: string;
  open: boolean;
  temperature: string;
  time: string | null;
  url: string;
}

interface Facility {
  id: string;
  title: string;
  state: {
    token: string;
  };
  structured_opening_hours: {
    closed: boolean;
    closes_at: string | null;
    opens_at: string | null;
  };
  external_apis: {
    items: {
      title: string;
      value: string;
    }[];
  };
}

const pageBase = "https://www.sportamt-bern.ch/sportanlagen/outdoor-anlagen/freibaeder";
const apiBase = import.meta.env.DEV
  ? "/bern"
  : "https://sportamtbern-api.webcloud7.ch/sportanlagen/outdoor-anlagen/freibaeder";
const searchUrl = `${apiBase}/@search?path.depth=1&fullobjects=1&metadata_fields=_all`;

const isFacility = (data: unknown): data is Facility => (
  typeof data === "object"
  && data !== null
  && "id" in data
  && "title" in data
  && "state" in data
  && "structured_opening_hours" in data
  && "external_apis" in data
);

export const fetchBadis = async (): Promise<UiBadi[]> => {
  const response = await fetch(searchUrl, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Sportamt Bärn: ${response.status.toString()}`);
  }

  const data = await response.json();

  if (typeof data !== "object" || data === null || !("items" in data) || !Array.isArray(data.items)) {
    throw new Error("Sportamt Bärn: unerwarteti Antwort");
  }

  return data.items
    .filter(isFacility)
    .toSorted((a, b) => a.id.localeCompare(b.id))
    .map((facility) => {
      const { items } = facility.external_apis;

      const temperature = (
        facility.id === "freibad-marzili"
          ? items.find(({ title }) => title === "Wasser Aare")
          : items.find(({ value }) => value.endsWith(" °C"))
      )?.value ?? "Weiss nid";

      const open = facility.state.token === "in-operation" && !facility.structured_opening_hours.closed;
      const isodate = open
        ? facility.structured_opening_hours.closes_at
        : facility.structured_opening_hours.opens_at;

      return {
        id: facility.id,
        name: facility.title,
        url: `${pageBase}/${facility.id}`,
        time: isodate?.slice(11, 16) ?? null,
        temperature,
        open
      };
    });
};
