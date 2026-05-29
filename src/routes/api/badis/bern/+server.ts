import type { BadiResponseItem } from "$lib/shared/badi-response";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

interface ExternalApiItem {
  title: string;
  value: string;
}

interface BernFacility {
  id: string;
  title: string;
  structured_opening_hours: {
    closed: boolean;
  };
  external_apis: {
    items: ExternalApiItem[];
  };
}

const apiBase = "https://sportamtbern-api.webcloud7.ch/sportanlagen/outdoor-anlagen/freibaeder";
const publicBase = "https://www.sportamt-bern.ch/sportanlagen/outdoor-anlagen/freibaeder";

const freibadIds = [
  "freibad-ka-we-de",
  "freibad-lorraine",
  "freibad-marzili",
  "freibad-weyermannshaus",
  "freibad-wyler"
] as const;

const isBernFacility = (data: unknown): data is BernFacility =>
  typeof data === "object"
  && data !== null
  && "id" in data
  && "title" in data
  && "structured_opening_hours" in data
  && "external_apis" in data;

export const GET: RequestHandler = async ({ setHeaders }) => {
  const freibadItems = await Promise.all(
    freibadIds.map(async (id) => {
      const response = await fetch(`${apiBase}/${id}`, {
        headers: {
          Accept: "application/json"
        }
      });
      const data: unknown = await response.json();

      return isBernFacility(data)
        ? data
        : error(400, "Malformed response!");
    })
  );

  const badis = freibadItems.map<BadiResponseItem>((facility) => {
    const temperature = facility.external_apis.items.find(
      ({ value }) => value.endsWith(" °C")
    )?.value ?? "Weiss nid";

    return {
      id: facility.id,
      name: facility.title,
      open: !facility.structured_opening_hours.closed,
      url: `${publicBase}/${facility.id}`,
      temperature
    } satisfies BadiResponseItem;
  });

  setHeaders({
    "Cache-Control": "max-age=600, immutable"
  });

  return json(badis);
};

export const prerender = true;
