# EverArchive architecture

## Run locally

Use Node.js 22.12 or newer. Run `npm install`, `npm run dev`, or `npm run build`.

## Data flow

React state drives the UI. Fetch retrieves fictional seed records from public/memories.json. Browser localStorage persists CRUD changes; FileReader converts uploaded images into data URLs. Memorials are derived from selected records and printed using CSS.

## Limitations

This is a frontend MVP, not a secure backup. No server CRUD, authentication, OCR, AI generation, or cloud database is implemented. Do not use real sensitive family data in the public demo. Browser storage can be cleared and has limited capacity.

## Next iteration

Use Supabase Auth, PostgreSQL row-level security, private object storage and REST endpoints for CRUD. Keep credentials out of source control. Add automated unit and integration tests and deploy the demo on a free static host.

## Interview discussion

Explain async fetch, effect cleanup, controlled inputs, immutable state updates, TypeScript interfaces, validation, storage failure handling, and the tradeoff between browser persistence and a server-backed archive.

## Source structure

- `src/App.tsx`: application composition and shared UI state.
- `src/components/`: archive, memory form, memorial builder and layout.
- `src/hooks/useMemories.ts`: archive state and CRUD coordination.
- `src/services/`: browser persistence, sample JSON fetch and photo reading.

Services are client-side boundaries, not a deployed backend API.
