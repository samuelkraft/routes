const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

// gets the data we want and puts it into variables
const minifyRecord = record => {
  return {
    id: record.id,
    fields: record.fields,
  }
}

// maps over the records, calling minifyRecord, giving us required data
const getMinifiedRecords = records => {
  return records.map(record => minifyRecord(record))
}

async function getTable(table) {
  const records = await base(table).select({}).all()
  const minifiedRecords = await getMinifiedRecords(records)

  return minifiedRecords
}

async function getAllRoutes() {
  const records = await base('Routes').all()
  const minifiedRecords = await getMinifiedRecords(records)

  return minifiedRecords
}

async function getAllRoutesPaths() {
  const routes = await getAllRoutes()

  return routes.map(route => {
    return {
      params: {
        id: route.id,
        slug: route.fields.slug,
      },
    }
  })
}

export { getTable, getAllRoutes, getAllRoutesPaths }
