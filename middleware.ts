import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/proxy(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/blog(.*)",
  "/pricing(.*)",
  "/changelog(.*)",
  "/docs(.*)",
  "/status(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
