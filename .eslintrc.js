module.exports = {
  extends: [
    'standard', 'prettier'
  ],
  plugins: ['prettier', 'promise', 'prettier', 'n', 'import'],
  env: {
    node: true
  },
  rules: {
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'class-methods-use-this': 0
  }
}
