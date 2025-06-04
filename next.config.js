const path = require('path')
 
module.exports = {
  output: 'standalone',

  async rewrites() {
    return [
        {
            source: '/static/:path*',
            destination: '/static/:path*',
        },
        {
          source: '/_next/static/:path*',
          destination: '/static/_next/static/:path*',
        },
    ];
},
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
      {
      protocol: 'https',
      hostname: 'cryptexblobs.blob.core.windows.net',
      pathname: '**',
    },
    ],
  },
}