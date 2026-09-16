import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // User site (kay-000.github.io) serves from the domain root, not a
  // project subpath. If this ever moves back to a project repo, set
  // this to '/<repo-name>/' again.
  base: '/'
})
