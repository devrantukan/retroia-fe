/** @type {import('next').NextConfig} */
const nextConfig = {images: {
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
  
    ],
  },};


  
export default nextConfig;
