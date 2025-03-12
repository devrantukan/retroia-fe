/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/emlak',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/emlak' : '',
  trailingSlash: true,
  distDir: '.next',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
 // compress: true,
  poweredByHeader: false,
  generateEtags: true,
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = `/emlak/_next/`;
    }
    return config;
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Handle static assets
        {
          source: '/emlak/_next/:path*',
          destination: '/_next/:path*',
        }
      ],
      afterFiles: [
        // Handle pages directly since Traefik strips /emlak
        {
          source: '/ofislerimiz',
          destination: '/ofislerimiz',
        },
        {
          source: '/danismanlarimiz',
          destination: '/danismanlarimiz',
        },
        {
          source: '/gayrimenkul-danismani-basvuru-formu',
          destination: '/gayrimenkul-danismani-basvuru-formu',
        },
        {
          source: '/gayrimenkullerinizi-satalim-kiralayalim',
          destination: '/gayrimenkullerinizi-satalim-kiralayalim',
        },
        // Handle API routes
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        }
      ]
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ];
  },
  images: {
  loader: 'custom',
  loaderFile: './src/lib/supabaseImageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/*',
      },
      {     
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
  
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
  
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',

      },
      {
        protocol: 'https',
        hostname: 'www.retroia.com',
      

      },
      {
        protocol: 'https',
        hostname: 'inegzzkuttzsznxfbsmp.supabase.co',
      

      },
      
    ],
    
  },

};


  
export default nextConfig;
