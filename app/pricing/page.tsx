"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PricingPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const startedRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (startedRef.current) return;
      if (isSignedIn === undefined) return;

      if (!isSignedIn || !user) {
        router.replace("/sign-in?redirect_url=/pricing");
        return;
      }

      startedRef.current = true;
      toast.success("Fixflow is now fully free. Redirecting to dashboard.");
      router.replace("/app/dashboard");
    };

    run();
  }, [isSignedIn, router, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F14] text-[#E6EDF3]">
      <div className="flex items-center gap-3 rounded-xl border border-[#232A34] bg-[#111620] px-5 py-3 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Redirecting...
      </div>
    </div>
  );
}
