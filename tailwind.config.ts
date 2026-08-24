import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kesari: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        terracotta: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        herbal: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warm: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#eae1d3",
          300: "#dbccba",
          400: "#c7b19a",
          500: "#b2967d",
          600: "#9e8067",
          700: "#826753",
          800: "#6b5445",
          900: "#574439",
          950: "#2e231c",
        },
      },
      fontFamily: {
        serif: ["var(--font-outfit)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        card: "0 4px 20px -2px rgba(120, 53, 15, 0.08)",
        hover: "0 10px 25px -3px rgba(120, 53, 15, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "gujarat-pattern": "radial-gradient(#d97706 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #fdfbf7 0.75px)",
      },
    },
  },
  plugins: [],
};

export default config;
