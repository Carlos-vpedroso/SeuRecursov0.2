import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // ← NÃO use NEXT_PUBLIC_ (isso deixaria exposto no browser)
  },
};

export default nextConfig;
