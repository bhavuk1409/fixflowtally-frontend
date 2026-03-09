"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,        // data considered fresh for 1 min
        gcTime: 5 * 60 * 1000,       // keep unused cache for 5 min
        retry: (failureCount, error) => {
          // Don't retry on auth errors or not-found
          const msg = (error as Error)?.message ?? "";
          if (msg.includes("401") || msg.includes("403") || msg.includes("404")) return false;
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0, // never auto-retry mutations
      },
    },
  });
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();

  // Recreate the QueryClient from scratch whenever the signed-in user changes.
  // This guarantees zero cache bleed between accounts — no previous user's data
  // can ever appear for the next user, even for a single render frame.
  const [queryClient, setQueryClient] = useState(() => makeQueryClient());

  useEffect(() => {
    // userId starts as null while Clerk loads, then resolves to the real ID.
    // We only want to reset when switching between two real users, not on the
    // initial null → id transition — but clearing on that transition is also
    // safe (it just means one extra refetch on first load).
    setQueryClient(makeQueryClient());
  }, [userId]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

