# Florian Bassani — Pirateria Musicale

Pirateria Musicale is a static React single-page application for exploring *La pirateria musicale in Ticino*. The book, full-text corpus, browse indexes, table of contents, and media files are versioned in this repository and run entirely in the browser; no backend or API service is required.

## Project structure

```text
src/       React application and UI components
dataset/   Full-text records, browse indexes, table of contents, and book HTML
media/     Inline and full-size book images
static/    Translated Markdown pages
build/     Generated production site (created by `yarn build`)
```

The `/search` page lazily loads the full-text corpus and searches it with FlexSearch. The `/browse` page lazily loads the local browse index. The  book transcription is loaded only when `/book` is opened. Search and browse results link directly to book anchors.

## Requirements

- Node.js 22.11.0 or later (the repository includes `.nvmrc`)
- Yarn Classic 1.22.22

## Development

Install dependencies once:

```bash
yarn install
```

Start the local development server:

```bash
yarn start
```

The application is served at `http://localhost:8081`.

## Production build

Create a clean production build:

```bash
yarn build
```

The generated static site, including all media, is written to `build/`. Deploy that directory with any static hosting provider or web server. Configure the host to serve `index.html` for unknown application routes so direct visits to SPA paths continue to work.
