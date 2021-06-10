This repo contains the source code of [Trail Routes](https://routes.samuelkraft.com)

Written with Next.js, Typescript, Tailwind CSS, Mapbox GL, Turf.js
Parses gpx files and shows them on a map.

## Getting Started

First create a mapbox account and get an [access token](https://docs.mapbox.com/help/glossary/access-token/). Add it as `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` to a file called `.env.local`.

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
```

Install dependencies

```bash
npm install
# or
yarn
```

Start the server with

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
