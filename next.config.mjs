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
};

export default nextConfig;
