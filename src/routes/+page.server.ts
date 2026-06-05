import { isAirResponse } from "$lib/shared/is-air-response";
import { isBadiResponse } from "$lib/shared/is-badi-response";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const [airResult, zurichResult, bernResult] = await Promise.all([
    fetch("/api/air-temp"),
    fetch("/api/badis/zurich"),
    fetch("/api/badis/bern")
  ]);

  const [airResponse, zurichResponse, bernResponse] = await Promise.all([
    airResult.json(),
    zurichResult.json(),
    bernResult.json()
  ]);

  return {
    air: isAirResponse(airResponse) ? airResponse : [],
    zurich: isBadiResponse(zurichResponse) ? zurichResponse : [],
    bern: isBadiResponse(bernResponse) ? bernResponse : []
  };
};
