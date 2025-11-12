import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // Naya import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // Naya plugin add karein
})

