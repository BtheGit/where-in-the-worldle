export const prerender = false;
import { generateById } from "../../../util/challenge";

export async function GET(): Promise<Response> {
  // Cloudflare does not support top level await. This will now change the challenge every load instead of every build.
  // TODO: Reference a daily challenge key somewhere else.
  const newChallenge = await generateById(Math.floor(Math.random() * 3000));
  // TODO: CORS
  return new Response(JSON.stringify(newChallenge), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
