import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works whether it's served from a user page
// (username.github.io) or a project subpath (username.github.io/repo/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
