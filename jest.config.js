module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@theme$': '<rootDir>/src/theme/index.ts',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@hooks$': '<rootDir>/src/hooks/index.ts',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@auth/(.*)$': '<rootDir>/src/screens/auth/$1',
  },
};
