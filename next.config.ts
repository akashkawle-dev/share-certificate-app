/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lms-website-content.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ai-image-creation.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "2g71tv1v-8080.inc1.devtunnels.ms",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mdbcdn.b-cdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "34.131.115.101",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "34.131.63.237",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "34.100.191.37",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "34.100.243.62",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "immverse-b2b-dev.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatar-bucket-v1.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lms-uat-test.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "3.110.40.146",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "edubackend.immverse.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "diy-mbx-v-1-s-logo.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "devapiv1.immverse.ai",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
