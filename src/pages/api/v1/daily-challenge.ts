import { generate } from "../../../util/challenge";
const newChallenge = await generate();

export async function get(): Promise<Response> {
  // TODO: CORS
  return new Response(JSON.stringify(newChallenge), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
