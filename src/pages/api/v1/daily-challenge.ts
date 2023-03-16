import { generate } from "../../../util/challenge";

export async function get(): Promise<Response> {
  // Cloudflare does not support top level await. This will now change the challenge every load instead of every build.
  // TODO: Reference a daily challenge key somewhere else.
  const newChallenge = await generate();
  // TODO: CORS
  return new Response(JSON.stringify(newChallenge), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
