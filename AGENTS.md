# 花蓮隨手查

## Purpose
Public, mobile-friendly destination information and map. No itinerary, personal trip dates, bookings, passenger records or personal age targeting. Official ticket age/height rules may remain.

## Data agent
- Own `data/places.json`. Research official sources and preserve the source URLs.
- Refresh prices, opening/closing hours, last admission, show sessions, addresses and location coordinates. Distinguish normal schedules from exceptional opening days. Never invent unknown values; mark them pending confirmation.
- Preserve stable unique IDs. Do not include private planning data or credentials.
- Record verification date and sources in the PR description, not as a travel date on the page.
- Run `npm run check`. Submit a data PR with a concise account of changes and uncertainties.

## Website agent
- Own `public/`, `scripts/`, and `.github/workflows/`.
- Consume the data file; do not duplicate destination facts in UI source. Keep all links/assets relative so repository subpaths work.
- Preserve category navigation, detail expansion, map markers, external map/navigation links and WebMCP tools.
- Run `npm run check` and `npm run build`, check relevant interactions and mobile layout when presentation changes.
- Review the data agent's completed PR. Update presentation only when needed; ordinary data changes do not require UI source changes.

## Handoff and publication
Data and website agents work in separate PRs/branches when concurrent. A data PR may publish directly after validation if no UI changes are needed. If schema changes require UI changes, combine the compatible changes in one reviewed PR before merging. CI checks every PR; merges/pushes to main publish through GitHub Pages. Never publish from an untrusted PR event. Do not add scheduled research or auto-merge without user instructions. No dependency on Google Sheets, Sites tools, this chat, or a running local preview.
