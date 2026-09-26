import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Deploying to GitHub Pages as a project site (https://<user>.github.io/<repo>/).
// GITHUB_REPOSITORY is set automatically by GitHub Actions, so the base path
// resolves to the correct repo name without any manual edits on your end.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
