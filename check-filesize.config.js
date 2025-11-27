// @ts-check

/** @type {import("./.ci/scripts/check-filesize.js").FileSizeCheckerConfig} */
const config = {
  directoriesRelativePaths: ["assets", "public", "out", ".next/static/media"],
  maxFileSizeInBytes: 1000000,
  includeGlobPatterns: ["*"],
  excludeGlobPatterns: [],
};

module.exports = config;
