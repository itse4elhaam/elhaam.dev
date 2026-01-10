import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.POSTHOG_API_KEY || "", {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      personalApiKey: process.env.POSTHOG_PERSONAL_API_KEY,
      enableLocalEvaluation: true,
      featureFlagsPollingInterval: 30000,
    });
  }
  return posthogClient;
}

export async function getServerSideFlags(distinctId: string): Promise<Record<string, unknown>> {
  const client = getPostHogClient();
  try {
    const flags = await client.getAllFlags(distinctId);
    return flags;
  } finally {
    await client.shutdown();
  }
}

export async function isFeatureEnabled(
  key: string,
  distinctId: string
): Promise<boolean | null> {
  const client = getPostHogClient();
  try {
    return await client.isFeatureEnabled(key, distinctId);
  } finally {
    await client.shutdown();
  }
}
