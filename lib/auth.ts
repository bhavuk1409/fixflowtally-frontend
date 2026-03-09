/**
 * lib/auth.ts
 * Helpers for accessing Clerk auth context in client components.
 * The real token is fetched via Clerk's useAuth() hook; this file
 * just centralises tenant/company resolution logic.
 */

/**
 * Resolve the tenant ID for the current session.
 *
 * Priority:
 *  1. Clerk Organization ID  (multi-tenant / team accounts)
 *  2. Clerk User ID          (solo accounts — each user = their own tenant)
 *  3. Env default            (local dev fallback only)
 */
export function getTenantId(
  orgId: string | null | undefined,
  userId: string | null | undefined,
): string {
  return (
    orgId ??
    userId ??
    process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID ??
    "test_tenant"
  );
}

export function getCompanyId(stored: string | null): string {
  return (
    stored ??
    process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID ??
    ""
  );
}
