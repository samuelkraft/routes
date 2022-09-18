import type { NextApiRequest, NextApiResponse } from 'next'

const gpxUtils = require('../../utils/gpxutils.js')

export default (_: NextApiRequest, res: NextApiResponse) => {
  const routes = gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf())

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({ routes })
}
