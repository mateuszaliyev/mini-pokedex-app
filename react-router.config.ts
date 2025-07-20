import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  prerender: () => ["/"],
  presets: [vercelPreset()],
  ssr: true,
} satisfies Config;
