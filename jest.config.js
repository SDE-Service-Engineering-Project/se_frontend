// jest.config.js
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  transformIgnorePatterns: [
    "/node_modules(?!.*.mjs$)/(?!(@angular|@testing-library|swiper|ssr-window|dom7))",
  ],
};
