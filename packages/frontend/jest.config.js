const ignores = ['/node_modules/', '<rootDir>/src/__tests__/__mocks__']

module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>/src'],
    moduleDirectories: ['node_modules'],
    transformIgnorePatterns: [...ignores],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(gif|svg|ico|url|require)$': '<rootDir>/svgTransform.js',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['tsx', 'js', 'ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$':
            '<rootDir>/src/__mocks__/fileMock.js',
    },
    clearMocks: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
        './src/tests/setup.js',
    ],
    resolver: 'jest-webpack-resolver',
    testEnvironment: 'jsdom',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/tests/test-utils.tsx'],
}
