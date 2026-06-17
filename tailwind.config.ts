import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm cream backgrounds
        cream: {
          DEFAULT: "#F4F1EA",
          50: "#FBFAF6",
          100: "#F4F1EA",
          200: "#EBE6DA",
          300: "#DED6C5",
        },
        // Deep forest green
        forest: {
          DEFAULT: "#1E3A2F",
          50: "#E7EDE9",
          100: "#C5D3CB",
          400: "#3C5C4C",
          500: "#2D4A3A",
          600: "#1E3A2F",
          700: "#16302A",
          800: "#102420",
          900: "#0B1A16",
        },
        ink: {
          DEFAULT: "#1A1A17",
          muted: "#5C5C52",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
