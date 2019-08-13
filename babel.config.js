module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['syntax-dynamic-import'],
    ['@babel/plugin-proposal-decorators',
      {
          legacy: true,
      }
    ],
  ],
};
