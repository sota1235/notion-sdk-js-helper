import defaultConfig from './jest.config.js';

export default {
  ...defaultConfig,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!jest.*',
  ],
};
