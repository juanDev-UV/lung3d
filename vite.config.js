import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Subimos el umbral del aviso: los vendor 3D son grandes por naturaleza,
    // pero ahora van en chunks compartidos y cacheables (no se duplican).
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Agrupa las dependencias pesadas en chunks de vendor compartidos:
        // el navegador los descarga UNA vez y los cachea para todas las páginas.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Motor de física (WASM→JS, ~2 MB): su propio chunk.
          if (id.includes('@dimforge') || id.includes('@react-three/rapier')) return 'rapier'
          // Three.js + helpers de R3F/drei.
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three-vendor'
          if (id.includes('firebase') || id.includes('@firebase')) return 'firebase'
          if (
            id.includes('react-router') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/')
          )
            return 'react-vendor'
          if (id.includes('framer-motion') || id.includes('gsap')) return 'motion'
          return 'vendor'
        },
      },
    },
  },
})
