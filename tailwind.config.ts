import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "organic editorial" — inspirada en mercados artesanales CR
        cream: {
          50: "#FBF8F2",
          100: "#F5EFE3",
          200: "#EBE2CD",
        },
        moss: {
          50: "#F2F4EE",
          100: "#DCE3D2",
          400: "#7A8B5C",
          500: "#5C6E42",
          600: "#465434",
          700: "#384228",
          800: "#252C1A",
          900: "#161A10",
        },
        terra: {
          400: "#C97A52",
          500: "#B5613B",
          600: "#9A4F2D",
        },
        ink: {
          DEFAULT: "#1B1F14",
          soft: "#3D4232",
        },
      },
      fontFamily: {
        // Display: Fraunces (editorial serif con carácter)
        // Body: Inter alternativo — usaremos "Manrope" (más humanista que Inter)
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(37, 44, 26, 0.06), 0 8px 24px -8px rgba(37, 44, 26, 0.12)",
        card: "0 1px 0 rgba(37, 44, 26, 0.04), 0 12px 32px -12px rgba(37, 44, 26, 0.18)",
        "card-hover":
          "0 1px 0 rgba(37, 44, 26, 0.04), 0 24px 48px -16px rgba(37, 44, 26, 0.28)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "slide-up": "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
