import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
// https://vitejs.dev/config/
export default defineConfig({

  envPrefix: "REACT_APP",
  plugins: [
    react(),
    envCompatible(),
  ],
  server: {
    port: 5173 // Specify your desired port number
  }
})
