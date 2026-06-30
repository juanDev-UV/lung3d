import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Los vendor 3D son grandes por naturaleza; subimos el umbral del aviso.
    // No usamos manualChunks manual: separar React en su propio chunk hacía
    // que three-vendor (R3F) se evaluara antes que React y fallara con
    // "Cannot read properties of undefined (reading 'useLayoutEffect')".
    // Dejamos que Vite/Rollup resuelva el orden de dependencias automáticamente.
    chunkSizeWarningLimit: 900,
  },
})
