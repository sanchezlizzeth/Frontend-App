import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    preview:{
    allowedHost: true,
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: [
      'zonegym-frontend-production.up.railway.app', // Tu dominio de Railway
      'all' // Opción alternativa para permitir cualquier host
    ]
  }
});
