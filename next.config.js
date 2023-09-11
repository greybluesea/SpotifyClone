/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "frbwlbutkxuvfuwemtbl.supabase.co",
      "frbwlbutkxuvfuwemtbl.supabase.co",
    ], // Add your Supabase image domain here
  },
};

module.exports = nextConfig;
