/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}
const nextConfig = {
  output: "export",
  // Emit `page/index.html` so the trailing-slash URLs used throughout the
  // site resolve on GitHub Pages when loaded directly or refreshed.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
};

module.exports = nextConfig;
