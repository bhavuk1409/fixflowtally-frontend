import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          bg:      "hsl(var(--success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          bg:      "hsl(var(--warning-bg))",
        },
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm:  "calc(var(--radius) - 3px)",
        md:  "calc(var(--radius) - 1px)",
        lg:  "var(--radius)",
        xl:  "calc(var(--radius) + 3px)",
        "2xl": "calc(var(--radius) + 6px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
      boxShadow: {
        card:           "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        "card-hover":   "0 8px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        "card-dark":    "0 1px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)",
        "card-dark-hover":"0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)",
        "glow-primary": "0 0 0 1px hsl(217 91% 60% / 0.18), 0 4px 20px hsl(217 91% 60% / 0.14)",
        "glow-success": "0 0 0 1px hsl(142 71% 45% / 0.18), 0 4px 20px hsl(142 71% 45% / 0.12)",
        "input-focus":  "0 0 0 3px hsl(217 91% 60% / 0.14)",
        glass:          "0 4px 16px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)",
        "dark-glass":   "0 4px 16px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        shimmer:            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        "gradient-primary": "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
        "gradient-card":    "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--surface-2)) 100%)",
        "gradient-hero":    "radial-gradient(ellipse 90% 70% at 50% -5%, hsl(217 91% 60% / 0.10) 0%, transparent 70%)",
        "gradient-dark-hero":"radial-gradient(ellipse 90% 60% at 50% -5%, hsl(217 91% 60% / 0.14) 0%, transparent 65%)",
        "dot-pattern":      "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%":   { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(0.8)", opacity: "0.5" },
          "70%":  { transform: "scale(2.0)", opacity: "0" },
          "100%": { transform: "scale(0.8)", opacity: "0" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)" },
          "30%":            { transform: "translateY(-5px)" },
        },
        "count-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "border-spin": {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "accordion-down":   "accordion-down 0.2s ease-out",
        "accordion-up":     "accordion-up 0.2s ease-out",
        shimmer:            "shimmer 2s linear infinite",
        "fade-in":          "fade-in 0.4s ease-out",
        "fade-in-scale":    "fade-in-scale 0.3s ease-out",
        float:              "float 4.5s ease-in-out infinite",
        "slide-up":         "slide-up 0.4s ease-out",
        "slide-in-right":   "slide-in-right 0.3s ease-out",
        "pulse-ring":       "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "typing-dot":       "typing-dot 1.4s ease-in-out infinite",
        "count-up":         "count-up 0.5s ease-out both",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      spacing: {
        "18":      "4.5rem",
        "22":      "5.5rem",
        sidebar:   "15rem",
        topbar:    "3.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
