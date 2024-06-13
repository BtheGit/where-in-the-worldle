import type { APIRoute } from "astro";
import { generateById } from "../../../../util/challenge";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  // Guarantees and invalid number becomes 0. ! is because TS doesn't know it can do that with undefined as well.
  const idNumber = ~~id!;
  const challenge = await generateById(idNumber);
  // TODO: CORS
  return new Response(JSON.stringify(challenge), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
