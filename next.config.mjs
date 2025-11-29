/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ignore React Native dependencies that MetaMask SDK tries to load
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };

    // Ignore node modules that are not needed in browser
    config.externals.push('pino', 'lokijs', 'encoding');

    return config;
  },

  // Farcaster manifest redirect
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019acd69-b469-e752-9fcf-90738e67e863',
        permanent: false, // Use 307 temporary redirect
      },
    ];
  },
};

export default nextConfig;
