import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppStateProvider } from "@/lib/store";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <AppStateProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Ambient background glow — dark mode only */}
        <div
          className="pointer-events-none fixed inset-0 z-0 hidden dark:block"
          aria-hidden
        >
          <div
            className="absolute left-[15%] top-[-10%] h-[500px] w-[500px] rounded-full opacity-[0.035]"
            style={{
              background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[10%] h-[400px] w-[400px] rounded-full opacity-[0.025]"
            style={{
              background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Desktop sidebar */}
        <Sidebar className="hidden lg:flex" />

        {/* Main content area */}
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AppStateProvider>
  );
}
