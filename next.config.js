// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración general
  reactStrictMode: true,
  // swcMinify: true,
  
  // Configuración de imágenes
  images: {
    domains: ['res.cloudinary.com'], // Para permitir imágenes de Cloudinary
  },
  typescript: {
    ignoreBuildErrors: true
  },
};

module.exports = nextConfig;