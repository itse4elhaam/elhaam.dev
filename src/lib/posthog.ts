import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) {
    return null;
  }
  
  if (!posthogClient) {
    posthogClient = new PostHog(apiKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      personalApiKey: process.env.POSTHOG_PERSONAL_API_KEY,
      featureFlagsPollingInterval: 30000,
    });
  }
  return posthogClient;
}

export async function getServerSideFlags(distinctId: string): Promise<Record<string, unknown>> {
  const client = getPostHogClient();
  if (!client) {
    return {};
  }
  try {
    const flags = await client.getAllFlags(distinctId);
    return flags;
  } catch (error) {
    console.error("Failed to get server-side flags:", error);
    return {};
  } finally {
    try {
      await client.shutdown();
    } catch {
      // Ignore shutdown errors
    }
  }
}

export async function isFeatureEnabled(
  key: string,
  distinctId: string
): Promise<boolean> {
  const client = getPostHogClient();
  if (!client) {
    return false;
  }
  try {
    const result = await client.isFeatureEnabled(key, distinctId);
    return result ?? false;
  } catch (error) {
    console.error(`Failed to check feature flag ${key}:`, error);
    return false;
  } finally {
    try {
      await client.shutdown();
    } catch {
      // Ignore shutdown errors
    }
  }
}
