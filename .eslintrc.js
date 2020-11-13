module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      'node': {
        'paths': ["src"]
      }
    }
  },
  rules: {
    'semi' : 0
  }
};
