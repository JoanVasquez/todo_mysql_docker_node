module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testTimeout: 20000,
  testEnvironment: "node",
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/build/", "/coverage/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(mapboxgl|@mapbox/mapbox-gl-draw)/)",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
