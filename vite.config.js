import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sert le site sous https://<user>.github.io/pefaco-maya-maya/
// -> il faut indiquer ce sous-dossier comme base pour que les assets se chargent correctement.
export default defineConfig({
  base: '/pefaco-maya-maya/',
  plugins: [react()],
})
