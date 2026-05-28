/**
 * Post status tags — single source of truth for content lifecycle.
 *
 * Posts can be tagged with one of these statuses to control where
 * they appear across the site (listing, navigation, SSG, RSS, etc.):
 *
 * - `coming-soon` — Planned post, shown dimmed on the homepage
 * - `archived`    — Retired post, excluded from all public views
 * - `test`        — Dev-only post, hidden in production
 */

export const POST_STATUS = {
  COMING_SOON: "coming-soon",
  ARCHIVED: "archived",
  TEST: "test",
} as const;

export function isComingSoon(post: { tags: string[] }): boolean {
  return post.tags.includes(POST_STATUS.COMING_SOON);
}

export function isArchived(post: { tags: string[] }): boolean {
  return post.tags.includes(POST_STATUS.ARCHIVED);
}

export function isTest(post: { tags: string[] }): boolean {
  return post.tags.includes(POST_STATUS.TEST);
}
