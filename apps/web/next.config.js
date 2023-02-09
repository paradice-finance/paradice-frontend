module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
    PARADICE_BACKEND_URL:process.env.PARADICE_BACKEND_URL, 
    CHAIN_ID: process.env.CHAIN_ID,
    LOTTERY_ADDRESS: process.env.LOTTERY_ADDRESS,
    SC_API: process.env.SC_API,
  },
};
