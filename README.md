# ScopeBolt Landing Page

Marketing landing page for a fictional SaaS product called ScopeBolt. The project is built with Vite, React, and Tailwind CSS and is structured as a single-page site focused on commercial subcontractor workflow pain points.

![ScopeBolt preview](public/og-image.svg)

## What is in the repo

- A React single-page landing page with custom sections for hero, proof, workflow, integrations, pricing, FAQ, and CTA.
- SEO and social preview metadata for the deployed site.
- GitHub Actions workflows for build verification and GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Deployment

The repo is configured for GitHub Pages deployment through GitHub Actions.

- Build validation runs on pushes and pull requests.
- Deployment runs automatically when `main` is updated.
- Expected Pages URL: `https://karumnieks99.github.io/saas-landing/`

## Project structure

- `src/` application code
- `public/` static assets
- `.github/workflows/` CI and deployment automation

## Notes

- The live marketing copy is branded as ScopeBolt even though the repository name remains `saas-landing`.
- `business.html` and `business.css` are separate static concept files and are not part of the React app build.
