# Roadmap: stack upgrade + Payload CMS 3

Targets: Node 22, next 16.4.6, react/react-dom 19.2.x (>=19.2.1), payload 3.93.0 (not v4 beta),
@payloadcms/db-postgres (Neon), @payloadcms/storage-vercel-blob (clientUploads: true). Env: DATABASE_URI, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN.

Phase 1 – Toolchain: engines node >=22 + .nvmrc, next 16.4.6, React 19 + types, ESLint 9 flat config
(codemod next-lint-to-eslint-cli), replace `next lint` script, remove react-multi-carousel. Site unchanged.
Phase 2 – Images: compress public/ images (target <500 KB each, keep names), check every <Image> still renders.
Phase 3 – Route groups: move layout/page/services into app/(frontend). No Payload yet. Same URLs.
Phase 4 – Install Payload: packages, payload.config.ts, app/(payload) from blank template, withPayload,
@payload-config alias, .env.example. Verify withPayload works with Turbopack. /admin loads locally.
Phase 5 – Schema: collections Media, Testimonials, ServiceCategories (subcategories, images, lists);
globals Hero, Biography, Contact, SiteSettings (title/description). Model on lib/servicesData.ts.
Phase 6 – Server data: pages become server components fetching via Local API; keep only interactive
parts as small client components; replace window.location menu with next/link.
Phase 7 – Seed: script importing current hardcoded content + images into Payload; delete hardcoded data after.
Phase 8 – Production: Blob storage adapter, Blob host in remotePatterns, prod migrations
(payload migrate:create), app/sitemap.ts to fix robots.txt, Vercel env vars.
