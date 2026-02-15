import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        border: "var(--border)",
        border2: "var(--border2)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        muted2: "var(--muted2)",
        accentGold: "var(--accentGold)",
        accentCyan: "var(--accentCyan)",
        accentGreen: "var(--accentGreen)",
        accentPurple: "var(--accentPurple)",
        ink: "var(--ink)",
      },
    },
  },
  plugins: [],
} satisfies Config;
