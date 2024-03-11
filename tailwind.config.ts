import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        critical: {
          "50": "#edfefe",
          "100": "#d0fdfd",
          "200": "#a8f7f9",
          "300": "#6bf0f5",
          "400": "#28dde8",
          "500": "#0cc2ce",
          "600": "#0d99ab",
          "700": "#127c8c",
          "800": "#186372",
          "900": "#185361",
          "950": "#0a3642",
        },
      },
      fontFamily: {
        sans: ["Mallory", "Arial", "Helvetica"],
        serif: ["YaleNewRoman", "Times New Roman", "Times"],
        helvetica: ["Helvetica Neue", "Helvetica", "Arial"],
      },
      textShadow: {
        DEFAULT: "0 0 9px #000",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
