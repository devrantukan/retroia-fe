/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/emlak',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/emlak' : '',
  trailingSlash: true,
  output: 'standalone',
  distDir: '.next',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  webpack: (config, { isServer }) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = `/emlak/_next/`;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/emlak/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          },
          {
            key: 'RSC',
            value: '1'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/emlak/_next/:path*',
          destination: '/_next/:path*',
        }
      ]
    };
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
  staticPageGenerationTimeout: 1000,
};


  
export default nextConfig;
