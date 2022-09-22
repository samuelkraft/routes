import type { NextApiRequest, NextApiResponse } from 'next'
import type { Route } from 'types'

const gpxUtils = require('../../../utils/gpxutils.js')

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  const { geoJson } = gpxUtils.routes.find((route: Route) => route.slug === slug)

  res.setHeader('Cache-Control', 's-maxage=259200, stale-while-revalidate')
  res.status(200).json({ ...geoJson })
}
