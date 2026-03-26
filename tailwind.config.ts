import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0f10",
        card: "#17181b",
        muted: "#cfcfcf",
        accent: {
          purple: "#7c3aed",
          orange: "#f97316",
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 58, 237, 0.45)",
        "glow-orange": "0 0 36px -12px rgba(249, 115, 22, 0.5)",
        lift: "0 20px 50px -24px rgba(0, 0, 0, 0.65)",
      },
      keyframes: {
        "file-preview-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "gallery-lightbox-in": {
          from: { opacity: "0", transform: "scale(0.985)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "gallery-overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "file-preview-in":
          "file-preview-in 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "gallery-lightbox-in":
          "gallery-lightbox-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "gallery-overlay-in":
          "gallery-overlay-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
