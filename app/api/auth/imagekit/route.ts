import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";

const {
  env: { imagekit },
} = config;

export async function GET() {
  if (!imagekit.privateKey || !imagekit.publicKey) {
    return Response.json(
      { error: "ImageKit privateKey and publicKey environment variables are required" },
      { status: 500 },
    );
  }

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: imagekit.privateKey, 
    publicKey: imagekit.publicKey,
    // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    // token: "random-token", // Optional, a unique token for request
  });

  return Response.json({ token, expire, signature, publicKey: imagekit.publicKey });
}
