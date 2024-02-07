import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mallory", "Arial", "Helvetica"],
        serif: ["YaleNewRoman", "Times New Roman", "Times"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
