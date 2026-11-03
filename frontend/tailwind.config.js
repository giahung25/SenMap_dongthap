/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lotus: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48", // Primary Hồng Sen
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        tram: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669", // Secondary Xanh Tràm
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        "canvas-bg": "#FAF7F2",
        "surface-white": "#FFFFFF",
        "surface-container-low": "#F4ECE7",
        "surface-container-high": "#EAE3D9",
        "on-surface": "#1E1B18",
        "text-muted": "#4A453E",
        heritage: {
          canvas: "#FAF7F2",
          section: "#F4ECE7",
          card: "#FFFFFF",
          ink: "#1E1B18",
          muted: "#4A453E",
          crimson: "#9E1B32",
          emerald: "#1E5631",
          gold: "#D5C390",
          border: "#E6DEC8",
          paper: "#EFE8DC",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif Display"', "Spectral", '"Be Vietnam Pro"', "serif"],
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(19, 27, 46, 0.10)",
        "glass-lg": "0 16px 40px -6px rgba(19, 27, 46, 0.20)",
      },
    },
  },
  plugins: [],
}
