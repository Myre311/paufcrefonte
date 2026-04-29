/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'oakjepaincpifhxlsdzo.supabase.co', pathname: '/storage/v1/object/public/**' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'paufc.fr' },
      { protocol: 'https', hostname: 'cdn.paufc.fr' },
    ],
  },
};

export default nextConfig;
