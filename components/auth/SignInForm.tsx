"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ── OAuth provider icons ───────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022"/>
    <path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00"/>
    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF"/>
    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900"/>
  </svg>
);

function OAuthButton({
  onClick, icon, label, loading,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  loading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-xl border text-[13px] font-medium text-white transition-all hover:border-white/20 hover:bg-white/5 disabled:opacity-50 active:scale-[0.98]"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
    >
      {icon}
      {label}
    </button>
  );
}

export function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) router.replace("/app/dashboard");
  }, [isSignedIn, router]);

  async function handleOAuth(provider: "oauth_google" | "oauth_apple" | "oauth_microsoft") {
    if (!isLoaded || !signIn) return;
    setOauthLoading(provider);
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/app/dashboard",
      });
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "OAuth sign-in failed.");
      setOauthLoading(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !signIn || !setActive) return;
    setError("");
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/app/dashboard");
      }
    } catch (err: any) {
      const msg: string = err?.errors?.[0]?.message ?? "Invalid email or password.";
      if (msg.toLowerCase().includes("session already exists")) {
        router.replace("/app/dashboard");
        return;
      }
      if (msg.toLowerCase().includes("verification strategy")) {
        setError("Password sign-in is not enabled. Use Google, Apple, or Microsoft above.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  const anyOAuthLoading = oauthLoading !== null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7 text-center">
        <h1 className="text-[28px] font-bold tracking-tight text-white">Welcome back</h1>
        <p className="mt-1.5 text-[14px]" style={{ color: "#8fa88f" }}>
          Sign in to your account to continue
        </p>
      </div>

      {/* OAuth buttons */}
      <div className="flex flex-col gap-2.5">
        <OAuthButton
          onClick={() => handleOAuth("oauth_google")}
          icon={<GoogleIcon />}
          label={oauthLoading === "oauth_google" ? "Redirecting…" : "Continue with Google"}
          loading={anyOAuthLoading}
        />
        <OAuthButton
          onClick={() => handleOAuth("oauth_apple")}
          icon={<AppleIcon />}
          label={oauthLoading === "oauth_apple" ? "Redirecting…" : "Continue with Apple"}
          loading={anyOAuthLoading}
        />
        <OAuthButton
          onClick={() => handleOAuth("oauth_microsoft")}
          icon={<MicrosoftIcon />}
          label={oauthLoading === "oauth_microsoft" ? "Redirecting…" : "Continue with Microsoft"}
          loading={anyOAuthLoading}
        />
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="text-[12px]" style={{ color: "#4a6a4a" }}>or continue with email</span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Email / password */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-white">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border px-4 text-[14px] text-white placeholder:text-white/25 outline-none transition-all"
            style={{ background: "#0a1a0f", borderColor: "rgba(74,222,128,0.2)", height: "48px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4ade80")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-white">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border px-4 pr-12 text-[14px] text-white placeholder:text-white/25 outline-none transition-all"
              style={{ background: "#0a1a0f", borderColor: "rgba(74,222,128,0.2)", height: "48px" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#4ade80")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end -mt-1">
          <Link href="/sign-in/forgot-password" className="text-[12px] transition-colors hover:text-white" style={{ color: "#4ade80" }}>
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-[13px] text-red-400" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="mt-1 w-full rounded-xl text-[15px] font-bold text-black transition-all active:scale-[0.98] disabled:opacity-60"
          style={{ background: "#4ade80", height: "48px" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#22c55e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4ade80")}
        >
          {loading ? "Signing in…" : "Sign in →"}
        </button>
      </form>

      <p className="mt-7 text-center text-[13px]" style={{ color: "#6b8a6b" }}>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold transition-colors" style={{ color: "#4ade80" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
