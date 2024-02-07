import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
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
