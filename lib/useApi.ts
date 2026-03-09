"use client";

/**
 * lib/useApi.ts
 * React hook that builds a fully-authed API client using the Clerk session token.
 */

import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { buildApi, createApiClient } from "./api";

export function useApi() {
  const { getToken } = useAuth();
  return useMemo(() => {
    const client = createApiClient(() => getToken());
    const api = buildApi(client);
    // Patch chat.stream with the getToken closure
    return {
      ...api,
      chat: {
        stream: (
          tenantId: string,
          companyId: string,
          messages: { role: string; content: string }[],
        ) => api.chat.stream(tenantId, companyId, messages, () => getToken()),
      },
    };
  }, [getToken]);
}
