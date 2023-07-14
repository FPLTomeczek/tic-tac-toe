import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  plugins: {
    "postcss-import": {},
    tailwindcss: { config: join(__dirname, "tailwind.config.js") },
    autoprefixer: {},
  },
};
