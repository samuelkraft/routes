module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'route',
          },
        ],
        destination: '/:route/',
        permanent: true,
      },
    ]
  },
  future: {
    webpack5: true,
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     require('./scripts/generate-images') // eslint-disable-line
  //   }

  //   return config
  // },
}
