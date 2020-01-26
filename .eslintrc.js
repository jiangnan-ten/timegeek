module.exports = {
  root: true,
  // 指定环境全局变量
  env: {
    node: true
  },
  // 自定义的全局变量
  globals: {
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  settings: {
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        useTabs: true,
        printWidth: 110,
        bracketSpacing: true,
				endOfLine: 'auto'
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 'off',
    'no-callback-literal': 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
