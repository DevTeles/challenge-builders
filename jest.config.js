module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    '/node_modules',
    'expo',
    '.expo-shared',
    'assets'
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect"
  ]    
}