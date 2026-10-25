import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // ByteXL dev preview uses a port proxy; production hosting serves from root.
  base: command === "serve" ? "/proxy/5173/" : "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
}));
