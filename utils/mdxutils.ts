import fs from 'fs'
import path from 'path'

// ROUTES_PATH is useful when you want to get the path to a specific file
export const ROUTES_PATH = path.join(process.cwd(), 'public', 'gpx')

// routeFilePaths is the list of all gpx files inside the ROUTES_PATH directory
export const routeFilePaths = fs
  .readdirSync(ROUTES_PATH)
  // Only include gpx files
  .filter(p => /\.gpx?$/.test(p))
