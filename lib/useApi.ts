"use client";

/**
 * lib/useApi.ts
 * React hook that builds a fully-authed API client using the Clerk session token.
 */

import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { buildApi } from "./api";

export function useApi() {
  const { getToken } = useAuth();
  return useMemo(() => {
    const api = buildApi();
    return {
      ...api,
      chat: {
        ...api.chat,
        stream: (
          tenantId: string,
          companyId: string,
          messages: { role: string; content: string }[],
        ) => api.chat.stream(tenantId, companyId, messages, () => getToken()),
      },
    };
  }, [getToken]);
}
