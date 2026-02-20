import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure react-three packages don't get server-side rendered
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
